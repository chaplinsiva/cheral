import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";
import * as fs from "fs";
import * as path from "path";

globalThis.WebSocket = WebSocket;


// Read .env.local
const envPath = path.resolve(".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      process.env[key] = val;
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function provisionAdmin() {
  const adminEmail = "admin@cheraltrust.org";
  const adminPassword = "CheralAdmin2026!";
  const fullName = "Cheral Trust Administrator";

  console.log(`Checking if admin user exists: ${adminEmail}...`);

  // Check if user already exists in auth.users
  const { data: userList, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) {
    console.error("Error listing users:", listError.message);
    return;
  }

  let user = userList.users.find((u) => u.email === adminEmail);

  if (!user) {
    console.log("Creating admin user in Supabase Auth...");
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { full_name: fullName, role: "superadmin" },
    });

    if (createError) {
      console.error("Failed to create user:", createError.message);
      return;
    }
    user = newUser.user;
    console.log("Admin user created in Supabase Auth:", user.id);
  } else {
    console.log("Admin user already exists in Supabase Auth:", user.id);
    // Ensure password is set to default
    await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: adminPassword,
      email_confirm: true,
    });
  }

  // Ensure record in public.admins
  const { data: existingAdmin } = await supabaseAdmin
    .from("admins")
    .select("*")
    .eq("email", adminEmail)
    .single();

  if (!existingAdmin) {
    console.log("Inserting record into public.admins table...");
    const { error: insertError } = await supabaseAdmin.from("admins").insert({
      auth_user_id: user.id,
      email: adminEmail,
      full_name: fullName,
      role: "superadmin",
    });

    if (insertError) {
      console.error("Error inserting to admins table:", insertError.message);
    } else {
      console.log("Successfully inserted admin into public.admins!");
    }
  } else {
    console.log("Admin record already present in public.admins:", existingAdmin.id);
    if (!existingAdmin.auth_user_id) {
      await supabaseAdmin.from("admins").update({ auth_user_id: user.id }).eq("id", existingAdmin.id);
    }
  }

  console.log("\n==========================================");
  console.log("Admin account provisioned successfully!");
  console.log(`Email:    ${adminEmail}`);
  console.log(`Password: ${adminPassword}`);
  console.log("==========================================");
}

provisionAdmin();
