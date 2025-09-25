export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-emerald-600">Kitchen Tales</h2>
            <p className="mt-2 text-sm text-gray-600">
              A place to share, discover, and enjoy recipes from around the world.  
              Cook, taste, and tell your story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-emerald-600">Home</a></li>
              <li><a href="/recipes" className="hover:text-emerald-600">Recipes</a></li>
              <li><a href="/favorites" className="hover:text-emerald-600">Favorites</a></li>
              <li><a href="/login" className="hover:text-emerald-600">Login</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-gray-500">
              <a href="#" className="hover:text-emerald-600">🌐</a>
              <a href="#" className="hover:text-emerald-600">📘</a>
              <a href="#" className="hover:text-emerald-600">📸</a>
              <a href="#" className="hover:text-emerald-600">🐦</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Kitchen Tales. All rights reserved.</p>
          <p>Made with ❤️ for food lovers</p>
        </div>
      </div>
    </footer>
  );
}
