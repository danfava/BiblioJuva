from app import app, db, Book

def seed_database():
    """Popula o banco de dados com alguns livros de exemplo"""
    with app.app_context():
        # Verificar se já existem livros
        if Book.query.count() > 0:
            print("Banco de dados já contém livros. Pulando seed.")
            return
        
        # Livros de exemplo
        sample_books = [
            {
                'title': 'Dom Casmurro',
                'author': 'Machado de Assis',
                'isbn': '978-85-359-0277-5',
                'published_date': '1899',
                'genre': 'Romance',
                'description': 'Um dos maiores clássicos da literatura brasileira, narrado por Bento Santiago.'
            },
            {
                'title': 'O Cortiço',
                'author': 'Aluísio Azevedo',
                'isbn': '978-85-359-0123-5',
                'published_date': '1890',
                'genre': 'Naturalismo',
                'description': 'Romance naturalista que retrata a vida em um cortiço no Rio de Janeiro.'
            },
            {
                'title': 'Iracema',
                'author': 'José de Alencar',
                'isbn': '978-85-359-0456-4',
                'published_date': '1865',
                'genre': 'Romance',
                'description': 'Lenda do Ceará que narra a história de amor entre Iracema e Martim.'
            },
            {
                'title': 'O Guarani',
                'author': 'José de Alencar',
                'isbn': '978-85-359-0789-3',
                'published_date': '1857',
                'genre': 'Romance',
                'description': 'Romance indianista que conta a história de Peri e Ceci.'
            },
            {
                'title': 'Memórias Póstumas de Brás Cubas',
                'author': 'Machado de Assis',
                'isbn': '978-85-359-0321-5',
                'published_date': '1881',
                'genre': 'Romance',
                'description': 'Romance narrado por um defunto autor, marco do realismo brasileiro.'
            }
        ]
        
        for book_data in sample_books:
            book = Book(**book_data)
            db.session.add(book)
        
        db.session.commit()
        print(f"Banco de dados populado com {len(sample_books)} livros de exemplo.")

if __name__ == '__main__':
    seed_database()

