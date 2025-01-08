import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ttzo7efi",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});
