// Mock data for categories
const categories = [
  { id: 1, name: "Electronics", isActive: true, createdAt: "2024-01-01" },
  { id: 2, name: "Clothing", isActive: true, createdAt: "2024-01-02" },
  { id: 3, name: "Home & Garden", isActive: true, createdAt: "2024-01-03" },
  { id: 4, name: "Sports", isActive: true, createdAt: "2024-01-04" },
  { id: 5, name: "Books", isActive: true, createdAt: "2024-01-05" },
  { id: 6, name: "Beauty", isActive: true, createdAt: "2024-01-06" },
  { id: 7, name: "Automotive", isActive: true, createdAt: "2024-01-07" },
  { id: 8, name: "Toys", isActive: true, createdAt: "2024-01-08" },
]

export default function handler(req, res) {
  const { method } = req
  const { id } = req.query
  const categoryId = parseInt(id)

  const category = categories.find(cat => cat.id === categoryId)

  if (!category) {
    return res.status(404).json({ error: 'Category not found' })
  }

  switch (method) {
    case 'GET':
      // Get category by ID
      res.status(200).json(category)
      break

    case 'PUT':
      // Update category (Admin only)
      const { name } = req.body
      
      if (!name) {
        return res.status(400).json({ error: 'Category name is required' })
      }

      category.name = name
      res.status(200).json(category)
      break

    case 'PATCH':
      // Deactivate category (Admin only)
      const { isActive } = req.body
      
      if (typeof isActive !== 'boolean') {
        return res.status(400).json({ error: 'isActive must be a boolean' })
      }

      category.isActive = isActive
      res.status(200).json(category)
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
