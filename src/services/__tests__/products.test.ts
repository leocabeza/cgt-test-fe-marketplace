import {
  getFeaturedProducts,
  getProduct,
  getProductBySlug,
  getProducts,
} from '../products';

describe('Products Service', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getProducts', () => {
    it('returns all products', async () => {
      const products = await getProducts();

      expect(products).toHaveLength(10);
      expect(products[0]).toHaveProperty('id');
      expect(products[0]).toHaveProperty('name');
      expect(products[0]).toHaveProperty('slug');
      expect(products[0]).toHaveProperty('price');
      expect(products[0]).toHaveProperty('description');
      expect(products[0]).toHaveProperty('image');
    });

    it('returns products with correct structure', async () => {
      const products = await getProducts();

      for (const product of products) {
        expect(typeof product.id).toBe('string');
        expect(typeof product.name).toBe('string');
        expect(typeof product.slug).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(typeof product.description).toBe('string');
        expect(typeof product.image).toBe('string');
        expect(product.price).toBeGreaterThan(0);
        expect(product.name).toBeTruthy();
        expect(product.slug).toBeTruthy();
      }
    });

    it('returns a copy of the products array (immutability)', async () => {
      const products1 = await getProducts();
      const products2 = await getProducts();

      expect(products1).not.toBe(products2); // Different references
      expect(products1).toEqual(products2); // Same content
    });
  });

  describe('getProduct', () => {
    it('returns product when found by valid id', async () => {
      const product = await getProduct('550e8400-e29b-41d4-a716-446655440001');

      expect(product).not.toBeNull();
      expect(product?.name).toBe('Alien 3D Replica');
      expect(product?.slug).toBe('alien-3d-replica');
      expect(product?.price).toBe(25.99);
    });

    it('returns null when product not found', async () => {
      const product = await getProduct('non-existent-id');

      expect(product).toBeNull();
    });

    it('returns null for empty string id', async () => {
      const product = await getProduct('');

      expect(product).toBeNull();
    });

    it('returns correct product for different valid ids', async () => {
      const alienProduct = await getProduct(
        '550e8400-e29b-41d4-a716-446655440001'
      );
      const astronautProduct = await getProduct(
        '550e8400-e29b-41d4-a716-446655440002'
      );

      expect(alienProduct?.name).toBe('Alien 3D Replica');
      expect(astronautProduct?.name).toBe('Astronaut Suit');
      expect(alienProduct?.id).not.toBe(astronautProduct?.id);
    });
  });

  describe('getProductBySlug', () => {
    it('returns product when found by valid slug', async () => {
      const product = await getProductBySlug('alien-3d-replica');

      expect(product).not.toBeNull();
      expect(product?.name).toBe('Alien 3D Replica');
      expect(product?.id).toBe('550e8400-e29b-41d4-a716-446655440001');
      expect(product?.price).toBe(25.99);
    });

    it('returns null when product not found by slug', async () => {
      const product = await getProductBySlug('non-existent-slug');

      expect(product).toBeNull();
    });

    it('returns null for empty string slug', async () => {
      const product = await getProductBySlug('');

      expect(product).toBeNull();
    });

    it('returns correct product for different valid slugs', async () => {
      const alienProduct = await getProductBySlug('alien-3d-replica');
      const astronautProduct = await getProductBySlug('astronaut-suit');

      expect(alienProduct?.name).toBe('Alien 3D Replica');
      expect(astronautProduct?.name).toBe('Astronaut Suit');
      expect(alienProduct?.slug).not.toBe(astronautProduct?.slug);
    });

    it('handles case-sensitive slug matching', async () => {
      const product = await getProductBySlug('Alien-3D-Replica'); // Wrong case

      expect(product).toBeNull();
    });
  });

  describe('getFeaturedProducts', () => {
    it('returns exactly 3 featured products', async () => {
      const featuredProducts = await getFeaturedProducts();

      expect(featuredProducts).toHaveLength(3);
    });

    it('returns the first 3 products from the collection', async () => {
      const allProducts = await getProducts();
      const featuredProducts = await getFeaturedProducts();

      expect(featuredProducts[0]).toEqual(allProducts[0]);
      expect(featuredProducts[1]).toEqual(allProducts[1]);
      expect(featuredProducts[2]).toEqual(allProducts[2]);
    });

    it('returns products with correct structure', async () => {
      const featuredProducts = await getFeaturedProducts();

      for (const product of featuredProducts) {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('slug');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('image');
      }
    });

    it('includes expected featured products', async () => {
      const featuredProducts = await getFeaturedProducts();

      const productNames = featuredProducts.map((p) => p.name);
      expect(productNames).toContain('Alien 3D Replica');
      expect(productNames).toContain('Astronaut Suit');
      expect(productNames).toContain('Retro Cassette Compilation');
    });
  });

  describe('Error handling and edge cases', () => {
    it('handles undefined id parameter', async () => {
      const product = await getProduct(undefined as unknown as string);

      expect(product).toBeNull();
    });

    it('handles undefined slug parameter', async () => {
      const product = await getProductBySlug(undefined as unknown as string);

      expect(product).toBeNull();
    });

    it('handles null parameters gracefully', async () => {
      const productById = await getProduct(null as unknown as string);
      const productBySlug = await getProductBySlug(null as unknown as string);

      expect(productById).toBeNull();
      expect(productBySlug).toBeNull();
    });
  });

  describe('Data consistency', () => {
    it('ensures all products have unique ids', async () => {
      const products = await getProducts();
      const ids = products.map((p) => p.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(products.length);
    });

    it('ensures all products have unique slugs', async () => {
      const products = await getProducts();
      const slugs = products.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);

      expect(uniqueSlugs.size).toBe(products.length);
    });

    it('ensures prices are reasonable values', async () => {
      const products = await getProducts();

      for (const product of products) {
        expect(product.price).toBeGreaterThan(0);
        expect(product.price).toBeLessThan(1000); // Reasonable upper limit
        expect(Number.isFinite(product.price)).toBe(true);
      }
    });

    it('ensures all required fields are non-empty strings', async () => {
      const products = await getProducts();

      for (const product of products) {
        expect(product.name.trim()).toBeTruthy();
        expect(product.slug.trim()).toBeTruthy();
        expect(product.description.trim()).toBeTruthy();
        expect(product.image.trim()).toBeTruthy();
        expect(product.id.trim()).toBeTruthy();
      }
    });
  });
});
