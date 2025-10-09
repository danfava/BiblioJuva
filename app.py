from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__) # BiblioJUVA Backend
CORS(app)  # Permitir CORS para todas as rotas

# Configuração do banco de dados SQLite
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "library.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo do Livro
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    isbn = db.Column(db.String(20), unique=True, nullable=False)
    published_date = db.Column(db.String(10))
    genre = db.Column(db.String(50))
    description = db.Column(db.Text)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'isbn': self.isbn,
            'published_date': self.published_date,
            'genre': self.genre,
            'description': self.description
        }

# Criar as tabelas
with app.app_context():
    db.create_all()

# Rotas da API

@app.route('/api/books', methods=['GET'])
def get_books():
    """Listar todos os livros"""
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books])

@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    """Obter um livro específico"""
    book = Book.query.get_or_404(book_id)
    return jsonify(book.to_dict())

@app.route('/api/books', methods=['POST'])
def create_book():
    """Criar um novo livro"""
    data = request.get_json()
    
    # Validação básica
    if not data or not data.get('title') or not data.get('author') or not data.get('isbn'):
        return jsonify({'error': 'Título, autor e ISBN são obrigatórios'}), 400
    
    # Verificar se o ISBN já existe
    existing_book = Book.query.filter_by(isbn=data['isbn']).first()
    if existing_book:
        return jsonify({'error': 'ISBN já existe'}), 400
    
    book = Book(
        title=data['title'],
        author=data['author'],
        isbn=data['isbn'],
        published_date=data.get('published_date'),
        genre=data.get('genre'),
        description=data.get('description')
    )
    
    db.session.add(book)
    db.session.commit()
    
    return jsonify(book.to_dict()), 201

@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    """Atualizar um livro existente"""
    book = Book.query.get_or_404(book_id)
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Dados não fornecidos'}), 400
    
    # Verificar se o ISBN já existe em outro livro
    if 'isbn' in data and data['isbn'] != book.isbn:
        existing_book = Book.query.filter_by(isbn=data['isbn']).first()
        if existing_book:
            return jsonify({'error': 'ISBN já existe'}), 400
    
    # Atualizar campos
    book.title = data.get('title', book.title)
    book.author = data.get('author', book.author)
    book.isbn = data.get('isbn', book.isbn)
    book.published_date = data.get('published_date', book.published_date)
    book.genre = data.get('genre', book.genre)
    book.description = data.get('description', book.description)
    
    db.session.commit()
    
    return jsonify(book.to_dict())

@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    """Deletar um livro"""
    book = Book.query.get_or_404(book_id)
    db.session.delete(book)
    db.session.commit()
    
    return jsonify({'message': 'Livro deletado com sucesso'}), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    """Verificação de saúde da API"""
    return jsonify({'status': 'OK', 'message': 'API funcionando corretamente'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

