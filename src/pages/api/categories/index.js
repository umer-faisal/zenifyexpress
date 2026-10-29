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

let nextId = 9

export default function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get all active categories
      const activeCategories = categories.filter(cat => cat.isActive)
      res.status(200).json(activeCategories)
      break

    case 'POST':
      // Create new category (Admin only)
      const { name } = req.body
      
      if (!name) {
        return res.status(400).json({ error: 'Category name is required' })
      }

      const newCategory = {
        id: nextId++,
        name,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      }

      categories.push(newCategory)
      res.status(201).json(newCategory)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
