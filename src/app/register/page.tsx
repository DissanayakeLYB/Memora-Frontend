import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

/**
 * Register Page — Redirects to Waitlist
 * 
 * During pre-launch, registration redirects to the waitlist.
 * Replace this with the actual registration page when ready to launch.
 */
export default function RegisterPage() {
  redirect(ROUTES.WAITLIST);
}
