-- Add role column to profiles table
ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';

-- Create works table for gallery items
CREATE TABLE public.works (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'blouse',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create policies for works
CREATE POLICY "Anyone can view works" 
ON public.works 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage works" 
ON public.works 
FOR ALL
USING (public.get_current_user_role() = 'admin');

-- Create favorites table for user favorites
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  work_id UUID NOT NULL REFERENCES public.works(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, work_id)
);

-- Enable RLS on favorites
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Favorites policies
CREATE POLICY "Users can view their own favorites" 
ON public.favorites 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites" 
ON public.favorites 
FOR ALL
USING (auth.uid() = user_id);

-- Create storage bucket for work images
INSERT INTO storage.buckets (id, name, public) VALUES ('works', 'works', true);

-- Storage policies for works bucket
CREATE POLICY "Anyone can view work images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'works');

CREATE POLICY "Only admins can upload work images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'works' AND
  public.get_current_user_role() = 'admin'
);

CREATE POLICY "Only admins can update work images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'works' AND
  public.get_current_user_role() = 'admin'
);

CREATE POLICY "Only admins can delete work images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'works' AND
  public.get_current_user_role() = 'admin'
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_works_updated_at
BEFORE UPDATE ON public.works
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample works data
INSERT INTO public.works (title, description, image_url, category, featured) VALUES
('Traditional Wedding Blouse', 'Elegant silk blouse with intricate gold embroidery work, perfect for wedding ceremonies', '/src/assets/wedding-blouse.webp', 'blouse', true),
('Designer Silk Blouse', 'Premium quality silk blouse with modern cuts and traditional patterns', '/src/assets/silk-blouse-1.webp', 'blouse', true),
('Bridal Lehenga Collection', 'Complete bridal lehenga set with matching blouse and dupatta', '/src/assets/bridal-lehenga.webp', 'lehenga', true),
('Traditional Gown', 'Beautiful traditional gown with contemporary styling', '/src/assets/traditional-gown.webp', 'gown', false),
('Blouse Collection', 'Variety of blouse designs for different occasions', '/src/assets/blouse-collection.webp', 'blouse', false);