"use client";

// agent-notes: { ctx: "WordPress-style CRM Admin Panel with Blog CRUD, Gallery Studio, Video Studio, Home Slides, 10 Core Values, and Cloudflare R2 Media Library", deps: ["src/lib/supabase.ts"], state: active, last: "antigravity@2026-10-18" }

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  author: string;
  published: boolean;
  created_at?: string;
}

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  display_order: number;
  active: boolean;
}

interface GalleryDbItem {
  id: string;
  title: string;
  category: string;
  category_label?: string;
  image_url: string;
  location?: string;
  description?: string;
  display_order: number;
}

interface CoreValue {
  id: string;
  title: string;
  description: string;
  tamil_title?: string;
  display_order: number;
}

interface Initiative {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image_url?: string;
  display_order: number;
}

interface VideoDbItem {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  youtube_id?: string;
  thumbnail_url?: string;
  category: string;
  download_url?: string;
  display_order: number;
}

interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  created_at?: string;
}

type NavSection = "dashboard" | "posts" | "hero" | "gallery" | "videos" | "values" | "initiatives" | "media" | "admins";

export default function AdminPage() {
  // Authentication
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active CRM Section
  const [activeNav, setActiveNav] = useState<NavSection>("dashboard");

  // Notifications
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Data states
  const [posts, setPosts] = useState<Post[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryDbItem[]>([]);
  const [videosList, setVideosList] = useState<VideoDbItem[]>([]);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [adminsList, setAdminsList] = useState<AdminUser[]>([]);


  // Post Editor modal & Inline Media Toolbar
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const contentInputRef = React.useRef<HTMLTextAreaElement>(null);
  const [inlineMediaModal, setInlineMediaModal] = useState<"image" | "video" | "link" | null>(null);
  const [inlineImageUrl, setInlineImageUrl] = useState("");
  const [inlineImageCaption, setInlineImageCaption] = useState("");
  const [inlineVideoUrl, setInlineVideoUrl] = useState("");
  const [inlineLinkUrl, setInlineLinkUrl] = useState("");
  const [inlineLinkText, setInlineLinkText] = useState("");
  const [uploadingInlineImage, setUploadingInlineImage] = useState(false);

  const insertIntoPostContent = (snippet: string) => {
    const textarea = contentInputRef.current;
    const current = editingPost?.content || "";
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = current.substring(0, start);
      const after = current.substring(end);
      const nextContent = `${before}${snippet}${after}`;
      setEditingPost((prev) => ({ ...prev, content: nextContent }));
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + snippet.length, start + snippet.length);
      }, 50);
    } else {
      setEditingPost((prev) => ({
        ...prev,
        content: current ? `${current}\n\n${snippet}` : snippet,
      }));
    }
  };

  const handleInsertInlineImage = () => {
    if (!inlineImageUrl.trim()) {
      setToast({ type: "error", msg: "Please enter or upload an image URL" });
      return;
    }
    const caption = inlineImageCaption.trim() || "Cheral Trust photograph";
    insertIntoPostContent(`\n\n![${caption}](${inlineImageUrl.trim()})\n\n`);
    setInlineImageUrl("");
    setInlineImageCaption("");
    setInlineMediaModal(null);
    setToast({ type: "success", msg: "Inline image added to article" });
  };

  const handleInsertInlineVideo = () => {
    if (!inlineVideoUrl.trim()) {
      setToast({ type: "error", msg: "Please enter a valid video URL (YouTube, Vimeo, or MP4)" });
      return;
    }
    insertIntoPostContent(`\n\n![video](${inlineVideoUrl.trim()})\n\n`);
    setInlineVideoUrl("");
    setInlineMediaModal(null);
    setToast({ type: "success", msg: "Inline video embed added to article" });
  };

  const handleInsertInlineLink = () => {
    if (!inlineLinkUrl.trim()) {
      setToast({ type: "error", msg: "Please provide a target URL" });
      return;
    }
    const label = inlineLinkText.trim() || inlineLinkUrl.trim();
    insertIntoPostContent(`[${label}](${inlineLinkUrl.trim()})`);
    setInlineLinkUrl("");
    setInlineLinkText("");
    setInlineMediaModal(null);
    setToast({ type: "success", msg: "Inline link inserted" });
  };

  // Hero Slide modal
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [slideModalOpen, setSlideModalOpen] = useState(false);

  // Gallery item modal
  const [editingGalleryItem, setEditingGalleryItem] = useState<Partial<GalleryDbItem> | null>(null);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("all");

  // Video item modal
  const [editingVideo, setEditingVideo] = useState<Partial<VideoDbItem> | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [savingVideo, setSavingVideo] = useState(false);


  // Value editor modal
  const [editingValue, setEditingValue] = useState<CoreValue | null>(null);

  // Initiative editor modal
  const [editingInit, setEditingInit] = useState<Initiative | null>(null);

  // Admin creator modal
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("admin");

  // File upload state for Cloudflare R2
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedMediaList, setUploadedMediaList] = useState<string[]>([]);

  // Check initial session
  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
        loadAllCrmData();
      }
    }
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
        loadAllCrmData();
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  async function loadAllCrmData() {
    try {
      const [postsRes, heroRes, galleryRes, videosRes, contentRes, adminsRes] = await Promise.all([
        fetch("/api/admin/posts").then((r) => r.json()),
        fetch("/api/admin/hero").then((r) => r.json()),
        fetch("/api/admin/gallery").then((r) => r.json()),
        fetch("/api/admin/videos").then((r) => r.json()),
        fetch("/api/admin/content").then((r) => r.json()),
        fetch("/api/admin/admins").then((r) => r.json()),
      ]);

      if (postsRes.posts) setPosts(postsRes.posts);
      if (heroRes.slides) setHeroSlides(heroRes.slides);
      if (galleryRes.items) setGalleryList(galleryRes.items);
      if (videosRes.videos) setVideosList(videosRes.videos);
      if (contentRes.values) setCoreValues(contentRes.values);
      if (contentRes.initiatives) setInitiatives(contentRes.initiatives);
      if (adminsRes.admins) setAdminsList(adminsRes.admins);
    } catch (err) {
      console.error("Failed to load CRM data", err);
    }
  }

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    if (!isSupabaseConfigured) {
      setAuthError(
        "Supabase credentials are not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables (e.g. in Vercel Project Settings) and redeploy the site."
      );
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        setCurrentUser(data.user);
        loadAllCrmData();
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  // Cloudflare R2 Upload Helper
  const handleFileUpload = async (file: File): Promise<string | null> => {
    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        showToast("error", data.error || "Upload to Cloudflare R2 failed");
        return null;
      }

      showToast("success", "Image uploaded successfully to Cloudflare R2!");
      setUploadedMediaList((prev) => [data.url, ...prev]);
      return data.url;
    } catch (err: any) {
      showToast("error", err.message || "Upload failed");
      return null;
    } finally {
      setUploadingFile(false);
    }
  };

  // POSTS CRUD
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title || !editingPost?.content) return;

    setSavingPost(true);
    try {
      if (isNewPost) {
        const res = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingPost),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast("success", "Blog article published successfully!");
      } else {
        const res = await fetch(`/api/admin/posts/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingPost),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast("success", "Article updated successfully!");
      }
      setPostModalOpen(false);
      setEditingPost(null);
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message || "Failed to save article");
    } finally {
      setSavingPost(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", "Post deleted successfully");
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete");
    }
  };

  // HERO SLIDES CRUD
  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide?.title || !editingSlide?.image_url) return;

    try {
      const method = editingSlide.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/hero", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSlide),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showToast("success", "Home hero slide saved successfully!");
      setSlideModalOpen(false);
      setEditingSlide(null);
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message || "Failed to save slide");
    }
  };

  const handleDeleteSlide = async (id: string) => {
    if (!confirm("Delete this hero slide?")) return;
    try {
      const res = await fetch(`/api/admin/hero?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", "Hero slide removed");
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  // GALLERY CRUD
  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGalleryItem?.title || !editingGalleryItem?.image_url) return;

    try {
      const isEdit = Boolean(editingGalleryItem.id);
      const url = isEdit ? `/api/admin/gallery/${editingGalleryItem.id}` : "/api/admin/gallery";
      const method = isEdit ? "PUT" : "POST";

      const categoryLabels: Record<string, string> = {
        nature: "Nature & Biodiversity",
        heritage: "Heritage & Epigraphy",
        plantation: "Tree Plantation",
        education: "Student Education",
        collaborations: "Collaborations",
      };

      const payload = {
        ...editingGalleryItem,
        category_label: categoryLabels[editingGalleryItem.category || "nature"] || "Nature",
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showToast("success", isEdit ? "Gallery photo updated!" : "Photo added to gallery!");
      setGalleryModalOpen(false);
      setEditingGalleryItem(null);
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message || "Failed to save gallery photo");
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", "Photo deleted from gallery");
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  // VIDEOS CRUD
  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo?.title || !editingVideo?.video_url) return;

    setSavingVideo(true);
    try {
      const isEdit = Boolean(editingVideo.id);
      const url = isEdit ? `/api/admin/videos/${editingVideo.id}` : "/api/admin/videos";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingVideo),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showToast("success", isEdit ? "Video updated successfully!" : "Video added to gallery archive!");
      setVideoModalOpen(false);
      setEditingVideo(null);
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message || "Failed to save video");
    } finally {
      setSavingVideo(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("success", "Video deleted successfully");
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  // CORE VALUES UPDATE
  const handleSaveValue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingValue) return;

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "value",
          id: editingValue.id,
          title: editingValue.title,
          description: editingValue.description,
          display_order: editingValue.display_order,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      showToast("success", `Core value "${editingValue.title}" updated in database!`);
      setEditingValue(null);
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  // INITIATIVES UPDATE
  const handleSaveInitiative = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInit) return;

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "initiative",
          id: editingInit.id,
          title: editingInit.title,
          subtitle: editingInit.subtitle,
          description: editingInit.description,
          image_url: editingInit.image_url,
          display_order: editingInit.display_order,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      showToast("success", `Initiative section updated in database!`);
      setEditingInit(null);
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  // ADMIN CREATION
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newAdminEmail,
          password: newAdminPassword,
          full_name: newAdminName,
          role: newAdminRole,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed");

      showToast("success", `Administrator ${newAdminEmail} created!`);
      setAdminModalOpen(false);
      setNewAdminEmail("");
      setNewAdminPassword("");
      setNewAdminName("");
      loadAllCrmData();
    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  const filteredGallery = galleryFilter === "all"
    ? galleryList
    : galleryList.filter((item) => item.category === galleryFilter);

  return (
    <div className="min-h-screen bg-[#F7F3EF] text-[#222222] font-sans flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-3 transition-all ${
            toast.type === "success"
              ? "bg-[#4A0E17] text-white border border-[#E8D9CC]"
              : "bg-red-700 text-white"
          }`}
        >
          <span>{toast.type === "success" ? "✓" : "⚠️"}</span>
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-white border-b border-[#E8D9CC] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-[#D9D9D9] flex items-center justify-center">
                <Image
                  src="/logos/Final Cheral logo transparent.png"
                  alt="Cheral Trust"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-[#4A0E17] block leading-none">
                  CHERAL TRUST
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#a62a14]">
                  WordPress-Style CRM Studio
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-[#6F6F6F] hover:text-[#4A0E17] flex items-center gap-1.5 transition"
            >
              <span>View Live Site</span>
              <span>↗</span>
            </Link>
            <Link
              href="/gallery"
              target="_blank"
              className="text-xs font-semibold text-[#6F6F6F] hover:text-[#4A0E17] transition"
            >
              View Gallery ↗
            </Link>
            <Link
              href="/blog"
              target="_blank"
              className="text-xs font-semibold text-[#a62a14] hover:underline transition"
            >
              View Blog Journal ↗
            </Link>

            {currentUser && (
              <div className="flex items-center gap-3 pl-4 border-l border-[#D9D9D9]">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-[#4A0E17]">{currentUser.email}</div>
                  <div className="text-[10px] text-[#a62a14] font-semibold uppercase">Administrator</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg border border-[#a62a14] text-[#a62a14] hover:bg-[#a62a14] hover:text-white transition text-xs font-semibold cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      {!currentUser ? (
        /* LOGIN SCREEN */
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#E8D9CC] p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#4A0E17]/5 border border-[#4A0E17]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#4A0E17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#4A0E17]">Admin Portal Login</h1>
              <p className="text-xs text-[#6F6F6F] mt-2">Manage Cheral Blog, Gallery, Hero Slideshow, and Core Values</p>
            </div>

            {!isSupabaseConfigured && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <span>⚠️</span> Environment Variables Missing
                </div>
                <div>
                  <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> must be added to your hosting dashboard (Vercel Project Settings &rarr; Environment Variables) and the site redeployed.
                </div>
              </div>
            )}

            {authError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E17] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cheraltrust.org"
                  required
                  className="w-full px-4 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E17]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-[#a62a14]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-4 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-sm font-semibold shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Authenticating..." : "Sign In to Admin CRM"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#E8D9CC] text-center">
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@cheraltrust.org");
                  setPassword("CheralAdmin2026!");
                }}
                className="text-xs font-semibold text-[#a62a14] hover:underline"
              >
                Quick-fill default superadmin credentials
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================= */
        /* WORDPRESS CRM WORKSPACE                   */
        /* ========================================= */
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* WordPress Left Navigation Sidebar */}
          <aside className="w-64 bg-white border-r border-[#E8D9CC] py-6 px-3 flex flex-col justify-between shrink-0 hidden md:flex">
            <div className="space-y-1.5">
              <div className="px-3 pb-3 mb-2 border-b border-[#E8D9CC]/60 text-[11px] uppercase tracking-wider font-bold text-[#6F6F6F]">
                Cheral CRM Menu
              </div>

              {[
                { id: "dashboard", label: "Dashboard", icon: "📊" },
                { id: "posts", label: "Blog / Posts", icon: "📝", count: posts.length },
                { id: "gallery", label: "Gallery Photos", icon: "📷", count: galleryList.length },
                { id: "videos", label: "Video Studio", icon: "🎬", count: videosList.length },
                { id: "hero", label: "Home Screen Images", icon: "🖼️", count: heroSlides.length },
                { id: "values", label: "10 Core Values", icon: "🏛️", count: coreValues.length },
                { id: "initiatives", label: "Core Initiatives", icon: "🌿", count: initiatives.length },
                { id: "media", label: "Cloudflare R2 Media", icon: "☁️" },
                { id: "admins", label: "Administrators", icon: "👥", count: adminsList.length },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id as NavSection)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    activeNav === item.id
                      ? "bg-[#4A0E17] text-white shadow-xs"
                      : "text-[#444444] hover:bg-[#F7F3EF] hover:text-[#4A0E17]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        activeNav === item.id
                          ? "bg-white/20 text-white"
                          : "bg-[#E8D9CC] text-[#4A0E17]"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-3 bg-[#F7F3EF] rounded-xl border border-[#E8D9CC] text-[11px] text-[#6F6F6F]">
              <div className="font-bold text-[#4A0E17] mb-0.5">Database Connected</div>
              <div>PostgreSQL (ap-southeast-1)</div>
              <div>R2: cheral-assets</div>
            </div>
          </aside>

          {/* Mobile Tab Bar */}
          <div className="md:hidden w-full bg-white border-b border-[#E8D9CC] p-2 flex overflow-x-auto gap-2">
            {(["dashboard", "posts", "gallery", "videos", "hero", "values", "initiatives", "media", "admins"] as NavSection[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveNav(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 ${
                  activeNav === tab ? "bg-[#4A0E17] text-white" : "bg-[#F7F3EF] text-[#6F6F6F]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            {/* 1. DASHBOARD */}
            {activeNav === "dashboard" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#4A0E17]">CRM Overview</h2>
                    <p className="text-xs text-[#6F6F6F] mt-1">Manage all public content, articles, gallery photos, and Cloudflare R2 assets</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingGalleryItem({ title: "", category: "nature", image_url: "", location: "Madurai, Tamil Nadu", description: "" });
                        setGalleryModalOpen(true);
                      }}
                      className="px-3.5 py-2 bg-white border border-[#D9D9D9] hover:bg-[#F7F3EF] text-[#4A0E17] rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <span>+ Add Photo</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingVideo({ title: "", video_url: "", category: "Docuseries", description: "", display_order: videosList.length + 1 });
                        setVideoModalOpen(true);
                      }}
                      className="px-3.5 py-2 bg-white border border-[#D9D9D9] hover:bg-[#F7F3EF] text-[#4A0E17] rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <span>+ Add Video</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingPost({ title: "", content: "", excerpt: "", category: "Ecology & Heritage", author: "Cheral Trust", published: true });
                        setIsNewPost(true);
                        setPostModalOpen(true);
                      }}
                      className="px-4 py-2 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-2"
                    >
                      <span>+ Write Post</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                  <div
                    onClick={() => setActiveNav("posts")}
                    className="bg-white p-5 rounded-2xl border border-[#E8D9CC] shadow-xs cursor-pointer hover:border-[#4A0E17] transition"
                  >
                    <div className="text-xs font-bold text-[#6F6F6F] uppercase">Blog Articles</div>
                    <div className="text-3xl font-serif font-bold text-[#4A0E17] mt-2">{posts.length}</div>
                    <div className="text-[11px] text-[#a62a14] font-medium mt-1">Manage articles →</div>
                  </div>

                  <div
                    onClick={() => setActiveNav("gallery")}
                    className="bg-white p-5 rounded-2xl border border-[#E8D9CC] shadow-xs cursor-pointer hover:border-[#4A0E17] transition"
                  >
                    <div className="text-xs font-bold text-[#6F6F6F] uppercase">Gallery Photos</div>
                    <div className="text-3xl font-serif font-bold text-[#4A0E17] mt-2">{galleryList.length}</div>
                    <div className="text-[11px] text-[#a62a14] font-medium mt-1">Manage photos →</div>
                  </div>

                  <div
                    onClick={() => setActiveNav("videos")}
                    className="bg-white p-5 rounded-2xl border border-[#E8D9CC] shadow-xs cursor-pointer hover:border-[#4A0E17] transition"
                  >
                    <div className="text-xs font-bold text-[#6F6F6F] uppercase">Video Studio</div>
                    <div className="text-3xl font-serif font-bold text-[#4A0E17] mt-2">{videosList.length}</div>
                    <div className="text-[11px] text-[#a62a14] font-medium mt-1">Manage videos →</div>
                  </div>

                  <div
                    onClick={() => setActiveNav("hero")}
                    className="bg-white p-5 rounded-2xl border border-[#E8D9CC] shadow-xs cursor-pointer hover:border-[#4A0E17] transition"
                  >
                    <div className="text-xs font-bold text-[#6F6F6F] uppercase">Hero Slides</div>
                    <div className="text-3xl font-serif font-bold text-[#4A0E17] mt-2">{heroSlides.length}</div>
                    <div className="text-[11px] text-[#a62a14] font-medium mt-1">Edit slideshow →</div>
                  </div>

                  <div
                    onClick={() => setActiveNav("media")}
                    className="bg-white p-5 rounded-2xl border border-[#E8D9CC] shadow-xs cursor-pointer hover:border-[#4A0E17] transition"
                  >
                    <div className="text-xs font-bold text-[#6F6F6F] uppercase">Cloudflare R2</div>
                    <div className="text-lg font-bold text-[#4A0E17] mt-2 truncate">cheral-assets</div>
                    <div className="text-[11px] text-[#a62a14] font-medium mt-1">Upload assets →</div>
                  </div>
                </div>

                {/* Quick Recent Articles */}
                <div className="bg-white rounded-2xl border border-[#E8D9CC] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg font-bold text-[#4A0E17]">Recent Blog Posts</h3>
                    <button
                      onClick={() => setActiveNav("posts")}
                      className="text-xs font-bold text-[#a62a14] hover:underline"
                    >
                      View All Posts →
                    </button>
                  </div>
                  <div className="divide-y divide-[#E8D9CC]/60">
                    {posts.slice(0, 3).map((p) => (
                      <div key={p.id} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm text-[#222222]">{p.title}</div>
                          <div className="text-xs text-[#6F6F6F]">{p.category} • {p.author}</div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${p.published ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"}`}>
                          {p.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. BLOG POSTS CRUD */}
            {activeNav === "posts" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#4A0E17]">Blog Management (Posts)</h2>
                    <p className="text-xs text-[#6F6F6F] mt-1">Create, edit, and publish articles for the Cheral Heritage & Ecological Journal</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingPost({ title: "", content: "", excerpt: "", category: "Ecology & Heritage", author: "Cheral Trust", published: true });
                      setIsNewPost(true);
                      setPostModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>+ Add New Post</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8D9CC] shadow-xs overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#F7F3EF] text-[#4A0E17] text-xs uppercase tracking-wider font-semibold border-b border-[#E8D9CC]">
                      <tr>
                        <th className="px-6 py-3.5">Cover</th>
                        <th className="px-6 py-3.5">Article Title</th>
                        <th className="px-6 py-3.5">Category</th>
                        <th className="px-6 py-3.5">Author</th>
                        <th className="px-6 py-3.5">Status</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8D9CC]/60">
                      {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-[#F7F3EF]/40 transition">
                          <td className="px-6 py-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 relative overflow-hidden border border-[#D9D9D9]">
                              {post.cover_image ? (
                                <Image src={post.cover_image} alt="" fill className="object-cover" />
                              ) : (
                                <div className="flex items-center justify-center h-full text-xs text-gray-400">📄</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-[#222222]">{post.title}</div>
                            <div className="text-[11px] font-mono text-[#6F6F6F]">/blog/{post.slug}</div>
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-[#4A0E17]">{post.category}</td>
                          <td className="px-6 py-4 text-xs text-[#6F6F6F]">{post.author}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${post.published ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"}`}>
                              {post.published ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              className="text-xs text-[#6F6F6F] hover:text-[#4A0E17] font-semibold"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => {
                                setEditingPost(post);
                                setIsNewPost(false);
                                setPostModalOpen(true);
                              }}
                              className="text-xs text-[#a62a14] hover:underline font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-xs text-red-600 hover:underline font-semibold"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. GALLERY STUDIO CRUD */}
            {activeNav === "gallery" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#4A0E17]">Gallery Studio Management</h2>
                    <p className="text-xs text-[#6F6F6F] mt-1">Add, edit, and organize photography for the Cheral public mosaic gallery</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingGalleryItem({
                        title: "",
                        category: "nature",
                        image_url: "",
                        location: "Madurai, Tamil Nadu",
                        description: "",
                        display_order: galleryList.length + 1,
                      });
                      setGalleryModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <span>+ Add Photo to Gallery</span>
                  </button>
                </div>

                {/* Category Filters */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {[
                    { id: "all", label: "All Photos" },
                    { id: "nature", label: "Nature & Biodiversity" },
                    { id: "heritage", label: "Heritage & Epigraphy" },
                    { id: "plantation", label: "Tree Plantation" },
                    { id: "education", label: "Student Education" },
                    { id: "collaborations", label: "Collaborations" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setGalleryFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        galleryFilter === cat.id
                          ? "bg-[#4A0E17] text-white"
                          : "bg-white border border-[#E8D9CC] text-[#6F6F6F] hover:bg-[#F7F3EF]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Gallery Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGallery.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#E8D9CC] overflow-hidden shadow-xs flex flex-col justify-between group hover:shadow-md transition"
                    >
                      <div className="relative h-52 bg-[#2D0A0E] overflow-hidden">
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-1 rounded-full bg-[#4A0E17]/85 text-white text-[10px] font-bold uppercase backdrop-blur-xs">
                            {item.category_label || item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-[#4A0E17] text-base line-clamp-1">{item.title}</h4>
                          <div className="text-xs text-[#a62a14] font-medium mt-1 flex items-center gap-1">
                            <span>📍</span>
                            <span>{item.location || "Madurai"}</span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-[#6F6F6F] mt-2 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                          <div className="text-[11px] font-mono text-[#888888] mt-2 truncate">
                            {item.image_url}
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-[#E8D9CC] flex items-center justify-between">
                          <button
                            onClick={() => {
                              setEditingGalleryItem(item);
                              setGalleryModalOpen(true);
                            }}
                            className="text-xs font-bold text-[#4A0E17] hover:underline cursor-pointer"
                          >
                            Edit Photo
                          </button>
                          <button
                            onClick={() => handleDeleteGalleryItem(item.id)}
                            className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3B. GALLERY VIDEO STUDIO */}
            {activeNav === "videos" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#4A0E17]">Gallery Video Studio</h2>
                    <p className="text-xs text-[#6F6F6F] mt-1">Manage YouTube videos, field documentaries, MP4 files, and direct downloads</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingVideo({
                        title: "",
                        video_url: "",
                        thumbnail_url: "",
                        category: "Docuseries",
                        description: "",
                        download_url: "",
                        display_order: videosList.length + 1,
                      });
                      setVideoModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>+ Add New Video</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videosList.map((vid) => (
                    <div
                      key={vid.id}
                      className="bg-white rounded-2xl border border-[#E8D9CC] overflow-hidden shadow-xs flex flex-col justify-between group hover:shadow-md transition"
                    >
                      <div className="relative aspect-video bg-[#2D0A0E] overflow-hidden">
                        {vid.thumbnail_url ? (
                          <Image
                            src={vid.thumbnail_url}
                            alt={vid.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-white/50 text-xs">
                            🎬 Video
                          </div>
                        )}
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-1 rounded-full bg-[#4A0E17]/85 text-white text-[10px] font-bold uppercase backdrop-blur-xs">
                            {vid.category}
                          </span>
                        </div>
                        {vid.youtube_id && (
                          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">
                            YouTube
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-[#4A0E17] text-base line-clamp-1">
                            {vid.title}
                          </h4>
                          {vid.description && (
                            <p className="text-xs text-[#6F6F6F] mt-2 line-clamp-2 leading-relaxed">
                              {vid.description}
                            </p>
                          )}
                          <div className="text-[11px] font-mono text-[#a62a14] mt-2 truncate">
                            {vid.video_url}
                          </div>
                          {vid.download_url && (
                            <div className="text-[10px] font-mono text-emerald-700 mt-1 truncate">
                              ⬇ Download: {vid.download_url}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 mt-4 border-t border-[#E8D9CC] flex items-center justify-between">
                          <button
                            onClick={() => {
                              setEditingVideo(vid);
                              setVideoModalOpen(true);
                            }}
                            className="text-xs font-bold text-[#4A0E17] hover:underline cursor-pointer"
                          >
                            Edit Video
                          </button>
                          <a
                            href={vid.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#6F6F6F] hover:text-[#4A0E17]"
                          >
                            Preview ↗
                          </a>
                          <button
                            onClick={() => handleDeleteVideo(vid.id)}
                            className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* 4. HOME SCREEN HERO SLIDES */}
            {activeNav === "hero" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#4A0E17]">Home Screen Images & Slideshow</h2>
                    <p className="text-xs text-[#6F6F6F] mt-1">Update hero banner photos, captions, and ordering on the live home page</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingSlide({ title: "", subtitle: "", image_url: "", display_order: heroSlides.length + 1, active: true });
                      setSlideModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    + Add New Slide
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {heroSlides.map((slide) => (
                    <div key={slide.id} className="bg-white rounded-2xl border border-[#E8D9CC] overflow-hidden shadow-xs flex flex-col justify-between">
                      <div className="relative h-48 bg-[#2D0A0E]">
                        <Image src={slide.image_url} alt={slide.title} fill className="object-cover" />
                        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                          Order: {slide.display_order}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-[#4A0E17] text-base">{slide.title}</h4>
                          <p className="text-xs text-[#6F6F6F] mt-1 line-clamp-2">{slide.subtitle}</p>
                          <div className="text-[11px] font-mono text-[#a62a14] mt-2 truncate">{slide.image_url}</div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-[#E8D9CC] flex items-center justify-between">
                          <button
                            onClick={() => {
                              setEditingSlide(slide);
                              setSlideModalOpen(true);
                            }}
                            className="text-xs font-bold text-[#4A0E17] hover:underline"
                          >
                            Edit Slide
                          </button>
                          <button
                            onClick={() => handleDeleteSlide(slide.id)}
                            className="text-xs font-bold text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. 10 CORE VALUES CRUD */}
            {activeNav === "values" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#4A0E17]">10 Core Values Content CRUD</h2>
                  <p className="text-xs text-[#6F6F6F] mt-1">Live database content for Cheral Trust values displayed on the home page</p>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8D9CC] shadow-xs overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#F7F3EF] text-[#4A0E17] text-xs uppercase tracking-wider font-semibold border-b border-[#E8D9CC]">
                      <tr>
                        <th className="px-6 py-3.5">#</th>
                        <th className="px-6 py-3.5">Core Value Title</th>
                        <th className="px-6 py-3.5">Official Description</th>
                        <th className="px-6 py-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8D9CC]/60">
                      {coreValues.map((val) => (
                        <tr key={val.id} className="hover:bg-[#F7F3EF]/40 transition">
                          <td className="px-6 py-4 font-bold text-[#a62a14]">{val.display_order}</td>
                          <td className="px-6 py-4 font-serif font-bold text-[#4A0E17] whitespace-nowrap">{val.title}</td>
                          <td className="px-6 py-4 text-xs text-[#6F6F6F] leading-relaxed">{val.description}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setEditingValue(val)}
                              className="px-3 py-1.5 rounded-lg bg-[#E8D9CC]/60 hover:bg-[#E8D9CC] text-[#4A0E17] text-xs font-bold transition"
                            >
                              Edit Value
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. CORE INITIATIVES SECTIONS */}
            {activeNav === "initiatives" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#4A0E17]">4 Core Initiatives & Sections</h2>
                  <p className="text-xs text-[#6F6F6F] mt-1">Manage Public Awareness, Student Education, Walks, and Plantation details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {initiatives.map((init) => (
                    <div key={init.id} className="bg-white rounded-2xl border border-[#E8D9CC] p-6 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[#a62a14] uppercase">Pillar 0{init.display_order}</span>
                          <span className="text-[11px] font-mono text-[#6F6F6F]">{init.image_url}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#4A0E17]">{init.title}</h3>
                        {init.subtitle && <h4 className="text-xs font-semibold text-[#6F6F6F] mt-1">{init.subtitle}</h4>}
                        <p className="text-xs text-[#444444] mt-3 leading-relaxed">{init.description}</p>
                      </div>

                      <div className="pt-4 mt-6 border-t border-[#E8D9CC] flex justify-end">
                        <button
                          onClick={() => setEditingInit(init)}
                          className="px-4 py-2 rounded-xl bg-[#4A0E17] hover:bg-[#2D0A0E] text-white text-xs font-semibold transition"
                        >
                          Edit Initiative
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. CLOUDFLARE R2 MEDIA UPLOADER */}
            {activeNav === "media" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#4A0E17]">Cloudflare R2 Media Studio</h2>
                  <p className="text-xs text-[#6F6F6F] mt-1">Direct high-speed object storage upload for images, brochure PDFs, and gallery assets</p>
                </div>

                {/* Dropzone / Upload Box */}
                <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-[#4A0E17]/30 text-center hover:border-[#4A0E17] transition">
                  <div className="w-14 h-14 rounded-2xl bg-[#4A0E17]/5 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#4A0E17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#4A0E17]">Upload Images to Cloudflare R2</h3>
                  <p className="text-xs text-[#6F6F6F] mt-1 max-w-md mx-auto">
                    Files are instantly uploaded to bucket <code className="font-mono text-[#a62a14]">cheral-assets</code> and served via high-speed global CDN.
                  </p>

                  <label className="mt-5 inline-block px-5 py-2.5 rounded-xl bg-[#4A0E17] hover:bg-[#2D0A0E] text-white text-xs font-bold cursor-pointer transition shadow-md">
                    {uploadingFile ? "Uploading to Cloudflare R2..." : "Select Image from Computer"}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingFile}
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) await handleFileUpload(file);
                      }}
                    />
                  </label>
                </div>

                {/* Uploaded CDN URLs */}
                {uploadedMediaList.length > 0 && (
                  <div className="bg-white p-6 rounded-2xl border border-[#E8D9CC]">
                    <h3 className="font-serif text-base font-bold text-[#4A0E17] mb-3">Recently Uploaded to R2</h3>
                    <div className="space-y-3">
                      {uploadedMediaList.map((url, i) => (
                        <div key={i} className="p-3 bg-[#F7F3EF] rounded-xl flex items-center justify-between text-xs">
                          <span className="font-mono text-[#4A0E17] truncate max-w-lg">{url}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(url);
                              showToast("success", "URL copied to clipboard!");
                            }}
                            className="px-3 py-1 bg-white border border-[#D9D9D9] rounded-lg font-bold text-[#a62a14] hover:bg-[#a62a14] hover:text-white transition"
                          >
                            Copy CDN URL
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 8. ADMIN ROSTER */}
            {activeNav === "admins" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#4A0E17]">Administrator Roster</h2>
                    <p className="text-xs text-[#6F6F6F] mt-1">Users with authorization to access the Cheral CRM studio</p>
                  </div>
                  <button
                    onClick={() => setAdminModalOpen(true)}
                    className="px-4 py-2 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    + Add New Administrator
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8D9CC] shadow-xs overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#F7F3EF] text-[#4A0E17] text-xs uppercase tracking-wider font-semibold border-b border-[#E8D9CC]">
                      <tr>
                        <th className="px-6 py-3.5">Name</th>
                        <th className="px-6 py-3.5">Email</th>
                        <th className="px-6 py-3.5">Role</th>
                        <th className="px-6 py-3.5">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8D9CC]/60">
                      {adminsList.map((admin) => (
                        <tr key={admin.id} className="hover:bg-[#F7F3EF]/40 transition">
                          <td className="px-6 py-4 font-semibold text-[#222222]">{admin.full_name || "Trustee"}</td>
                          <td className="px-6 py-4 font-mono text-xs text-[#6F6F6F]">{admin.email}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-[#E8D9CC] text-[#4A0E17]">
                              {admin.role || "admin"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-[#6F6F6F]">
                            {admin.created_at ? new Date(admin.created_at).toLocaleDateString() : "Initial"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* MODAL: POST EDITOR */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8D9CC] my-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8D9CC]">
              <h3 className="font-serif text-xl font-bold text-[#4A0E17]">
                {isNewPost ? "Write New Article" : "Edit Blog Article"}
              </h3>
              <button onClick={() => setPostModalOpen(false)} className="text-[#6F6F6F] font-bold">✕</button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E17] mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  value={editingPost?.title || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  required
                  placeholder="e.g. Sacred Groves of Ancient Tamil Nadu"
                  className="w-full px-4 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E17] mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingPost?.category || "Ecology & Heritage"}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E17] mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={editingPost?.author || "Cheral Trust"}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                  />
                </div>
              </div>

              {/* Cover Image with R2 Direct Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E17] mb-1">
                  Cover Image (Cloudflare R2 URL or Local Image)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingPost?.cover_image || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, cover_image: e.target.value })}
                    placeholder="/images/pdf/image-004.jpg or https://pub-*.r2.dev/..."
                    className="flex-1 px-4 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                  />
                  <label className="px-3.5 py-2.5 bg-[#E8D9CC] hover:bg-[#D9D9D9] text-[#4A0E17] rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-1.5 shrink-0">
                    <span>☁️ Upload to R2</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleFileUpload(file);
                          if (url) setEditingPost((prev) => ({ ...prev, cover_image: url }));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E17] mb-1">
                  Short Excerpt
                </label>
                <textarea
                  rows={2}
                  value={editingPost?.excerpt || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="Summary for article previews..."
                  className="w-full px-4 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E17]">
                    Article Body (Markdown & Rich Media)
                  </label>
                  <span className="text-[11px] text-[#6F6F6F]">
                    Supports inline images, embedded videos & hyperlinks
                  </span>
                </div>

                {/* Editorial Media Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#E8D9CC]/50 border border-[#D9D9D9] border-b-0 rounded-t-xl text-xs">
                  {/* Inline Image Button */}
                  <button
                    type="button"
                    onClick={() => setInlineMediaModal("image")}
                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F7F3EF] border border-[#D9D9D9] text-[#4A0E17] font-bold text-xs flex items-center gap-1 shadow-2xs transition cursor-pointer"
                    title="Insert Inline Image (Cloudflare R2 or Web URL)"
                  >
                    <span>📷</span>
                    <span>Add Image</span>
                  </button>

                  {/* Inline Video Button */}
                  <button
                    type="button"
                    onClick={() => setInlineMediaModal("video")}
                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F7F3EF] border border-[#D9D9D9] text-[#4A0E17] font-bold text-xs flex items-center gap-1 shadow-2xs transition cursor-pointer"
                    title="Insert Inline Video (YouTube, Vimeo, MP4)"
                  >
                    <span>🎬</span>
                    <span>Add Video</span>
                  </button>

                  {/* Inline Link Button */}
                  <button
                    type="button"
                    onClick={() => setInlineMediaModal("link")}
                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F7F3EF] border border-[#D9D9D9] text-[#4A0E17] font-bold text-xs flex items-center gap-1 shadow-2xs transition cursor-pointer"
                    title="Insert Hyperlink"
                  >
                    <span>🔗</span>
                    <span>Add Link</span>
                  </button>

                  <div className="h-4 w-px bg-[#D9D9D9] mx-1" />

                  {/* Formatting quick chips */}
                  <button
                    type="button"
                    onClick={() => insertIntoPostContent("\n\n## Section Title\n\n")}
                    className="px-2 py-1 rounded bg-white/80 hover:bg-white text-[#4A0E17] text-[11px] font-bold border border-[#D9D9D9]/80 cursor-pointer"
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertIntoPostContent("\n\n### Subheading\n\n")}
                    className="px-2 py-1 rounded bg-white/80 hover:bg-white text-[#4A0E17] text-[11px] font-bold border border-[#D9D9D9]/80 cursor-pointer"
                    title="Heading 3"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => insertIntoPostContent("\n\n- Key observation\n- Conservation action\n")}
                    className="px-2 py-1 rounded bg-white/80 hover:bg-white text-[#4A0E17] text-[11px] font-bold border border-[#D9D9D9]/80 cursor-pointer"
                    title="Bullet List"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    onClick={() => insertIntoPostContent("\n\n> Historical consciousness bridges heritage with future preservation.\n\n")}
                    className="px-2 py-1 rounded bg-white/80 hover:bg-white text-[#4A0E17] text-[11px] font-bold border border-[#D9D9D9]/80 cursor-pointer"
                    title="Blockquote"
                  >
                    “ Quote
                  </button>
                </div>

                <textarea
                  ref={contentInputRef}
                  rows={9}
                  value={editingPost?.content || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  required
                  placeholder="## Heading 2&#10;&#10;Article text goes here... Use the toolbar above to insert inline images, YouTube/Vimeo videos, or links."
                  className="w-full px-4 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-b-xl text-sm focus:ring-2 focus:ring-[#4A0E17] font-mono text-xs focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E8D9CC]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#4A0E17]">
                  <input
                    type="checkbox"
                    checked={editingPost?.published ?? true}
                    onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                    className="w-4 h-4 text-[#4A0E17] rounded"
                  />
                  <span>Publish Article Immediately</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPostModalOpen(false)}
                    className="px-4 py-2 border border-[#D9D9D9] rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingPost}
                    className="px-5 py-2 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {savingPost ? "Saving..." : "Save Post"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUB-MODAL: INLINE IMAGE INSERTION */}
      {inlineMediaModal === "image" && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#E8D9CC] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8D9CC]">
              <h4 className="font-serif font-bold text-[#4A0E17] text-base flex items-center gap-1.5">
                <span>📷</span>
                <span>Add Inline Image</span>
              </h4>
              <button onClick={() => setInlineMediaModal(null)} className="text-[#6F6F6F] font-bold cursor-pointer">✕</button>
            </div>

            <p className="text-xs text-[#6F6F6F]">
              Upload an image directly to Cloudflare R2 or enter an image URL to place directly into your article text.
            </p>

            {/* Upload Directly to R2 */}
            <div className="p-3.5 bg-[#F7F3EF] rounded-xl border border-[#E8D9CC]">
              <span className="block text-[11px] font-bold uppercase text-[#4A0E17] mb-2">Option 1: Upload File to Cloudflare R2</span>
              <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#4A0E17] text-white rounded-lg text-xs font-semibold cursor-pointer hover:bg-[#2D0A0E] transition">
                <span>☁️ Choose image from computer</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploadingInlineImage}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadingInlineImage(true);
                      const cdnUrl = await handleFileUpload(file);
                      setUploadingInlineImage(false);
                      if (cdnUrl) {
                        setInlineImageUrl(cdnUrl);
                        setToast({ type: "success", msg: "Uploaded to Cloudflare R2! Enter caption and click Insert." });
                      }
                    }
                  }}
                />
              </label>
              {uploadingInlineImage && <span className="ml-2 text-xs text-[#a62a14] font-medium animate-pulse">Uploading to R2...</span>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Option 2: Image URL</label>
              <input
                type="text"
                value={inlineImageUrl}
                onChange={(e) => setInlineImageUrl(e.target.value)}
                placeholder="https://pub-*.r2.dev/photo.jpg or /images/..."
                className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Image Caption / Alt Text</label>
              <input
                type="text"
                value={inlineImageCaption}
                onChange={(e) => setInlineImageCaption(e.target.value)}
                placeholder="e.g. Guided biodiversity observation along Vaigai River"
                className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E8D9CC]">
              <button
                type="button"
                onClick={() => setInlineMediaModal(null)}
                className="px-3.5 py-1.5 border border-[#D9D9D9] rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertInlineImage}
                className="px-4 py-1.5 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODAL: INLINE VIDEO INSERTION */}
      {inlineMediaModal === "video" && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#E8D9CC] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8D9CC]">
              <h4 className="font-serif font-bold text-[#4A0E17] text-base flex items-center gap-1.5">
                <span>🎬</span>
                <span>Add Inline Video URL</span>
              </h4>
              <button onClick={() => setInlineMediaModal(null)} className="text-[#6F6F6F] font-bold cursor-pointer">✕</button>
            </div>

            <p className="text-xs text-[#6F6F6F] leading-relaxed">
              Embed a responsive video player into your article. Supports YouTube watch & short URLs, Vimeo links, and direct MP4/WebM video files.
            </p>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Video URL</label>
              <input
                type="text"
                value={inlineVideoUrl}
                onChange={(e) => setInlineVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs font-mono"
              />
              <span className="text-[10px] text-[#888888] mt-1.5 block">
                Examples: <br />
                • https://www.youtube.com/watch?v=dQw4w9WgXcQ <br />
                • https://youtu.be/dQw4w9WgXcQ <br />
                • https://vimeo.com/76979871
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E8D9CC]">
              <button
                type="button"
                onClick={() => setInlineMediaModal(null)}
                className="px-3.5 py-1.5 border border-[#D9D9D9] rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertInlineVideo}
                className="px-4 py-1.5 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Insert Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODAL: INLINE LINK INSERTION */}
      {inlineMediaModal === "link" && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#E8D9CC] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8D9CC]">
              <h4 className="font-serif font-bold text-[#4A0E17] text-base flex items-center gap-1.5">
                <span>🔗</span>
                <span>Add Inline Hyperlink</span>
              </h4>
              <button onClick={() => setInlineMediaModal(null)} className="text-[#6F6F6F] font-bold cursor-pointer">✕</button>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Target URL</label>
              <input
                type="text"
                value={inlineLinkUrl}
                onChange={(e) => setInlineLinkUrl(e.target.value)}
                placeholder="https://cheral.org or /gallery"
                className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Link Display Text</label>
              <input
                type="text"
                value={inlineLinkText}
                onChange={(e) => setInlineLinkText(e.target.value)}
                placeholder="e.g. Cheral Conservation Archive"
                className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E8D9CC]">
              <button
                type="button"
                onClick={() => setInlineMediaModal(null)}
                className="px-3.5 py-1.5 border border-[#D9D9D9] rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertInlineLink}
                className="px-4 py-1.5 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: GALLERY ITEM EDITOR */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8D9CC] space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8D9CC]">
              <h3 className="font-serif text-lg font-bold text-[#4A0E17]">
                {editingGalleryItem?.id ? "Edit Gallery Photograph" : "Add Photograph to Gallery"}
              </h3>
              <button onClick={() => setGalleryModalOpen(false)} className="text-[#6F6F6F] font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Photo Title / Caption</label>
                <input
                  type="text"
                  value={editingGalleryItem?.title || ""}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })}
                  placeholder="e.g. Guided Nature Trail Exploration"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Category</label>
                  <select
                    value={editingGalleryItem?.category || "nature"}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                  >
                    <option value="nature">Nature & Biodiversity</option>
                    <option value="heritage">Heritage & Epigraphy</option>
                    <option value="plantation">Tree Plantation</option>
                    <option value="education">Student Education</option>
                    <option value="collaborations">Collaborations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Location</label>
                  <input
                    type="text"
                    value={editingGalleryItem?.location || ""}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, location: e.target.value })}
                    placeholder="e.g. Madurai River Basin"
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                  />
                </div>
              </div>

              {/* Image URL & Cloudflare R2 Uploader */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">
                  Image URL (Cloudflare R2 or Path)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingGalleryItem?.image_url || ""}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, image_url: e.target.value })}
                    placeholder="/images/nature_biodiversity_walk.jpg or https://pub-*.r2.dev/..."
                    required
                    className="flex-1 px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs font-mono"
                  />
                  <label className="px-3.5 py-2 bg-[#E8D9CC] hover:bg-[#D9D9D9] text-[#4A0E17] rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-1.5 shrink-0">
                    <span>☁️ R2 Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleFileUpload(file);
                          if (url) setEditingGalleryItem((prev) => ({ ...prev, image_url: url }));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Description / Notes</label>
                <textarea
                  rows={3}
                  value={editingGalleryItem?.description || ""}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, description: e.target.value })}
                  placeholder="Field observation context..."
                  className="w-full px-3.5 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8D9CC]">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2 border border-[#D9D9D9] rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#4A0E17] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIDEO ITEM EDITOR */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8D9CC] space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8D9CC]">
              <h3 className="font-serif text-lg font-bold text-[#4A0E17]">
                {editingVideo?.id ? "Edit Video Documentary" : "Add Video Documentary"}
              </h3>
              <button onClick={() => setVideoModalOpen(false)} className="text-[#6F6F6F] font-bold cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Video Title</label>
                <input
                  type="text"
                  value={editingVideo?.title || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  placeholder="e.g. Sacred Groves of Ancient Tamil Nadu"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Video URL (YouTube or MP4)</label>
                <input
                  type="text"
                  value={editingVideo?.video_url || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, video_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  required
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs font-mono"
                />
                <span className="text-[10px] text-[#888888] mt-1 block">
                  YouTube thumbnails are automatically generated if left blank.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Category</label>
                  <select
                    value={editingVideo?.category || "Docuseries"}
                    onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                  >
                    <option value="Docuseries">Docuseries</option>
                    <option value="Nature & Biodiversity">Nature & Biodiversity</option>
                    <option value="Heritage & History">Heritage & History</option>
                    <option value="Plantation & Conservation">Plantation & Conservation</option>
                    <option value="Student Education">Student Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingVideo?.display_order || 1}
                    onChange={(e) => setEditingVideo({ ...editingVideo, display_order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm focus:ring-2 focus:ring-[#4A0E17]"
                  />
                </div>
              </div>

              {/* Custom Thumbnail URL & Cloudflare R2 Uploader */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">
                  Custom Thumbnail (Optional - Cloudflare R2 or Auto YouTube)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingVideo?.thumbnail_url || ""}
                    onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail_url: e.target.value })}
                    placeholder="Leave empty for auto YouTube thumbnail or paste R2 URL"
                    className="flex-1 px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs font-mono"
                  />
                  <label className="px-3.5 py-2 bg-[#E8D9CC] hover:bg-[#D9D9D9] text-[#4A0E17] rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-1.5 shrink-0">
                    <span>☁️ R2 Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleFileUpload(file);
                          if (url) setEditingVideo((prev) => ({ ...prev, thumbnail_url: url }));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Download URL (Cloudflare R2 or External) */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">
                  Download URL (Optional MP4 file link for offline download)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingVideo?.download_url || ""}
                    onChange={(e) => setEditingVideo({ ...editingVideo, download_url: e.target.value })}
                    placeholder="https://pub-*.r2.dev/videos/... or external download link"
                    className="flex-1 px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs font-mono"
                  />
                  <label className="px-3.5 py-2 bg-[#E8D9CC] hover:bg-[#D9D9D9] text-[#4A0E17] rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-1.5 shrink-0">
                    <span>☁️ R2 Video</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleFileUpload(file);
                          if (url) setEditingVideo((prev) => ({ ...prev, download_url: url }));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Description / Notes</label>
                <textarea
                  rows={3}
                  value={editingVideo?.description || ""}
                  onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                  placeholder="Field documentation context and locations..."
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8D9CC]">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-4 py-2 border border-[#D9D9D9] rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingVideo}
                  className="px-5 py-2 bg-[#4A0E17] hover:bg-[#2D0A0E] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {savingVideo ? "Saving..." : "Save Video"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: HERO SLIDE EDITOR */}
      {slideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-[#E8D9CC] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#4A0E17]">
              {editingSlide?.id ? "Edit Hero Slide" : "Add New Hero Slide"}
            </h3>

            <form onSubmit={handleSaveSlide} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Headline</label>
                <input
                  type="text"
                  value={editingSlide?.title || ""}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingSlide?.subtitle || ""}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingSlide?.image_url || ""}
                    onChange={(e) => setEditingSlide({ ...editingSlide, image_url: e.target.value })}
                    required
                    className="flex-1 px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-xs font-mono"
                  />
                  <label className="px-3 py-2 bg-[#E8D9CC] text-[#4A0E17] rounded-xl text-xs font-bold cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await handleFileUpload(file);
                          if (url) setEditingSlide((prev) => ({ ...prev, image_url: url }));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingSlide?.display_order || 1}
                  onChange={(e) => setEditingSlide({ ...editingSlide, display_order: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8D9CC]">
                <button
                  type="button"
                  onClick={() => setSlideModalOpen(false)}
                  className="px-4 py-2 border border-[#D9D9D9] rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4A0E17] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CORE VALUE EDITOR */}
      {editingValue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-[#E8D9CC] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#4A0E17]">
              Edit Core Value #{editingValue.display_order}
            </h3>

            <form onSubmit={handleSaveValue} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Title</label>
                <input
                  type="text"
                  value={editingValue.title}
                  onChange={(e) => setEditingValue({ ...editingValue, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Description</label>
                <textarea
                  rows={4}
                  value={editingValue.description}
                  onChange={(e) => setEditingValue({ ...editingValue, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8D9CC]">
                <button
                  type="button"
                  onClick={() => setEditingValue(null)}
                  className="px-4 py-2 border border-[#D9D9D9] rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4A0E17] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Update Value
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: INITIATIVE EDITOR */}
      {editingInit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-[#E8D9CC] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#4A0E17]">
              Edit Core Initiative
            </h3>

            <form onSubmit={handleSaveInitiative} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Title</label>
                <input
                  type="text"
                  value={editingInit.title}
                  onChange={(e) => setEditingInit({ ...editingInit, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingInit.subtitle || ""}
                  onChange={(e) => setEditingInit({ ...editingInit, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Description</label>
                <textarea
                  rows={4}
                  value={editingInit.description}
                  onChange={(e) => setEditingInit({ ...editingInit, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8D9CC]">
                <button
                  type="button"
                  onClick={() => setEditingInit(null)}
                  className="px-4 py-2 border border-[#D9D9D9] rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4A0E17] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Update Initiative
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADMIN CREATOR */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-[#E8D9CC] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#4A0E17]">Add Administrator</h3>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Full Name</label>
                <input
                  type="text"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="e.g. S. Ramanathan"
                  required
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Email</label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="trustee@cheraltrust.org"
                  required
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4A0E17] mb-1">Password</label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="••••••••••••"
                  minLength={8}
                  required
                  className="w-full px-3 py-2 bg-[#F7F3EF]/60 border border-[#D9D9D9] rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8D9CC]">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="px-4 py-2 border border-[#D9D9D9] rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4A0E17] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
