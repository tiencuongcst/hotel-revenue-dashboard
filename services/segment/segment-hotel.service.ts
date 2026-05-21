import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SegmentHotelOption = {
  hotel_code: string;
  hotel_name: string | null;
};

export async function getSegmentHotelOptions(): Promise<
  SegmentHotelOption[]
> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("hotel_info")
    .select("hotel_code, hotel_name")
    .order("hotel_name", { ascending: true })
    .limit(100);

  if (error) {
    throw new Error(
      `Failed to load segment hotel options: ${error.message}`
    );
  }

  return data ?? [];
}