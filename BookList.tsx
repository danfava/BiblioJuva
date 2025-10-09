'use client'

import { Book } from '../types/Book'

interface BookListProps {
  books: Book[]
  onEdit: (book: Book) => void
  onDelete: (bookId: number) => void
}

export default function BookList({ books, onEdit, onDelete }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Nenhum livro encontrado
        </h3>
        <p className="text-gray-500">
          Adicione seu primeiro livro ao catálogo!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                {book.title}
              </h3>
              <div className="flex space-x-2 ml-2">
                <button
                  onClick={() => onEdit(book)}
                  className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(book.id)}
                  className="text-red-600 hover:text-red-800 transition-colors p-1"
                  title="Deletar"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-gray-600">
                <span className="font-semibold">Autor:</span> {book.author}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
              {book.published_date && (
                <p className="text-gray-600">
                  <span className="font-semibold">Publicado:</span> {book.published_date}
                </p>
              )}
              {book.genre && (
                <p className="text-gray-600">
                  <span className="font-semibold">Gênero:</span> {book.genre}
                </p>
              )}
            </div>
            
            {book.description && (
              <div className="border-t pt-4">
                <p className="text-gray-700 text-sm line-clamp-3">
                  {book.description}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

