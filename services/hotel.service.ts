import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { HotelOption } from '@/types/hotel';

export async function getHotelOptions(): Promise<HotelOption[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('hotel_info')
    .select(`
      hotel_code,
      hotel_name,
      display_order
    `)
    .eq('is_active', true)
    .order('display_order', {
      ascending: true,
      nullsFirst: false,
    })
    .order('hotel_code', {
      ascending: true,
    })
    .limit(100);

  if (error) {
    throw new Error(`Failed to fetch hotel list: ${error.message}`);
  }

  return (data ?? []) as HotelOption[];
}