'use client'

import { useState, useEffect } from 'react'
import { Book } from '../types/Book'

interface BookFormProps {
  book?: Book | null
  onSubmit: (bookData: Book | Omit<Book, 'id'>) => void
  onClose: () => void
}

export default function BookForm({ book, onSubmit, onClose }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    published_date: '',
    genre: '',
    description: ''
  })

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        published_date: book.published_date || '',
        genre: book.genre || '',
        description: book.description || ''
      })
    }
  }, [book])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.author.trim() || !formData.isbn.trim()) {
      alert('Título, autor e ISBN são obrigatórios!')
      return
    }

    const bookData = {
      ...formData,
      title: formData.title.trim(),
      author: formData.author.trim(),
      isbn: formData.isbn.trim(),
      published_date: formData.published_date.trim() || undefined,
      genre: formData.genre.trim() || undefined,
      description: formData.description.trim() || undefined
    }

    if (book) {
      onSubmit({ ...bookData, id: book.id })
    } else {
      onSubmit(bookData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {book ? 'Editar Livro' : 'Adicionar Novo Livro'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Autor *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
                ISBN *
              </label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="published_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Publicação
                </label>
                <input
                  type="text"
                  id="published_date"
                  name="published_date"
                  value={formData.published_date}
                  onChange={handleChange}
                  placeholder="Ex: 2023"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                  Gênero
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="Ex: Romance, Ficção"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Descrição do livro..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {book ? 'Atualizar' : 'Adicionar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

