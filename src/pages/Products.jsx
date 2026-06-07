import { useEffect, useState } from 'react'

function Products() {
  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()
        setProducts(data)
      } catch {
        setError('Something went wrong while loading products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <main className="page">
      <div className="page-heading">
        <p className="eyebrow">Products</p>
        <h1>Products Page</h1>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search products by title"
        />
        <p className="count-pill">Products: {filteredProducts.length}</p>
      </div>

      {loading && <p className="message-card">Loading products...</p>}
      {error && <p className="message-card error-message">{error}</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="message-card">No products found.</p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <section className="products-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <div className="product-info">
                <span>{product.category}</span>
                <h2>{product.title}</h2>
                <p>${product.price}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default Products
