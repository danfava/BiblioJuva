'use client'

import { useState, useEffect } from 'react'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import { Book } from './types/Book'

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/books`)
      if (response.ok) {
        const data = await response.json()
        setBooks(data)
      } else {
        console.error('Erro ao buscar livros:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBook = async (bookData: Omit<Book, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      })

      if (response.ok) {
        await fetchBooks()
        setIsFormOpen(false)
      } else {
        const error = await response.json()
        alert(`Erro: ${error.error}`)
      }
    } catch (error) {
      console.error('Erro ao criar livro:', error)
      alert('Erro ao conectar com o servidor')
    }
  }

  const handleUpdateBook = async (bookData: Book) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books/${bookData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      })

      if (response.ok) {
        await fetchBooks()
        setSelectedBook(null)
        setIsFormOpen(false)
      } else {
        const error = await response.json()
        alert(`Erro: ${error.error}`)
      }
    } catch (error) {
      console.error('Erro ao atualizar livro:', error)
      alert('Erro ao conectar com o servidor')
    }
  }

  const handleDeleteBook = async (bookId: number) => {
    if (!confirm('Tem certeza que deseja deletar este livro?')) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchBooks()
      } else {
        const error = await response.json()
        alert(`Erro: ${error.error}`)
      }
    } catch (error) {
      console.error('Erro ao deletar livro:', error)
      alert('Erro ao conectar com o servidor')
    }
  }

  const handleEditBook = (book: Book) => {
    setSelectedBook(book)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setSelectedBook(null)
    setIsFormOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📚 Catálogo de Biblioteca
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sistema de gerenciamento de livros com funcionalidades completas de CRUD
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            ➕ Adicionar Novo Livro
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <BookList
            books={books}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
          />
        )}

        {isFormOpen && (
          <BookForm
            book={selectedBook}
            onSubmit={selectedBook ? handleUpdateBook : handleCreateBook}
            onClose={handleCloseForm}
          />
        )}
      </div>
    </div>
  )
}
