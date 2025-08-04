import React, { useState, useEffect } from 'react';
import { Heart, Star, ArrowLeft, ChefHat, MapPin, Phone, Mail, Instagram, Clock, Users, Award } from 'lucide-react';
import './Menu.css';

const Menu = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [apiError, setApiError] = useState(null);

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Replace with your actual backend URL
        const response = await fetch('http://localhost:5000/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const items = await response.json();
        setMenuItems(items);
        
        // Extract unique categories from items
        const uniqueCategories = [...new Set(items.map(item => item.category))];
        const categoryData = uniqueCategories.map(category => ({
          id: category.toLowerCase(),
          name: category,
          image: getCategoryImage(category),
          color: getCategoryColor(category)
        }));
        setCategories(categoryData);
        
        setApiError(null);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setApiError('Failed to load menu items. Please try again later.');
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchMenuItems();
  }, []);

  // Helper function to get category image
  const getCategoryImage = (category) => {
    const imageMap = {
       "Hot Drinks": "assets/hot.jpg",
  "Juice": "assets/juice.jpg",
  "Mocktail": "assets/mocktail.jpg",
  "Milkshake": "assets/milshake.jpg",
  "Mojito": "assets/Mojito.jpg",
  "Ice Creams": "assets/ice.jpg",
  "Veg Soups": "assets/vegsoup.jpg",
  "Non-Veg Soups": "assets/nonvegsoup.jpg",
  "Chats": "assets/chats.jpg",
  "Roti": "assets/roti.jpg",
  "Rolls": "assets/ROLL.jpg",
  "Chinese Starters (Veg)": "assets/chineseveg.jpg",
  "Chinese Starters (Non-Veg)": "assets/chinesenon.jpg",
  "veg": "assets/veg.jpg",
  "Non-Veg": "assets/nonveg.jpg",
  "Veg Biryani": "assets/vegbri.jpg",
  "Non-Veg Biryani": "assets/nonvegbri.jpg",
  "North Indian (Veg)": "assets/north.jpg",
  "North Indian (Non-Veg)": "assets/northnon.jpg",
  "Tandoori (Veg)": "assets/tandoori.jpg",
  "Tandoori (Non-Veg)": "assets/tandoorinon.jpg",
  "South Indian (Non-Veg)": "assets/south.jpg",
  "Rice Items": "assets/rice.jpg",
  "Salad": "assets/salad.jpg",
  "Meals": "assets/meals.jpg"

    };
    return imageMap[category.toLowerCase()] || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop';
  };

  // Helper function to get category color
  const getCategoryColor = (category) => {
    const colorMap = {
      'biryani': '#795548',
      'chinese': '#607d8b',
      'north indian': '#ff6b35',
      'south indian': '#4caf50',
      'beverages': '#2196f3',
      'desserts': '#e91e63'
    };
    return colorMap[category.toLowerCase()] || '#757575';
  };

  // Get items for selected category
  const getItemsForCategory = (categoryId) => {
    return menuItems.filter(item => 
      item.category.toLowerCase() === categoryId.toLowerCase()
    );
  };

  // Format price based on portions
  const formatPrice = (item) => {
    if (item.portions) {
      if (item.portions.quarter && item.portions.half && item.portions.full) {
        return `₹${item.portions.quarter} - ₹${item.portions.full}`;
      } else if (item.portions.half && item.portions.full) {
        return `₹${item.portions.half} - ₹${item.portions.full}`;
      } else if (item.portions.full) {
        return `₹${item.portions.full}`;
      }
    }
    return `₹${item.price}`;
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage('items');
  };

  const handleBackToCategories = () => {
    setCurrentPage('categories');
    setSelectedCategory(null);
  };

  const RestaurantLogo = () => (
    <div className="restaurant-logo">
      <div className="logo-image-container">
        <img 
          src="assets/hitha.jpg" 
          alt="Hitha Family Restaurant Logo" 
          className="main-logo"
        />
      </div>
      
      <div className="logo-text">
        <h1>HITHA</h1>
        <p>THE FAMILY RESTAURANT</p>
      </div>
      
      <div className="ornamental-line">
        <div className="decorative-swirl left"></div>
        <div className="center-dot"></div>
        <div className="decorative-swirl right"></div>
      </div>
    </div>
  );

  const LoaderPage = () => (
    <div className="loader-page">
      <div className="loader-background"></div>
      <div className="loader-container">
        <div className="logo-fixed">
          <RestaurantLogo />
        </div>
      </div>
      <div className="loading-dots">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="dot" style={{ animationDelay: `${i * 0.16}s` }}></div>
        ))}
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="restaurant-footer">
      <div className="footer-logo">
        <img 
          src="assets/hitha.jpg" 
          alt="Hitha Family Restaurant Logo" 
          className="footer-logo-img"
        />
      </div>

      <div className="footer-content">
        <div className="footer-section address">
          <div className="footer-icon">
            <MapPin size={20} />
          </div>
          <div className="footer-text">
            <h4>Visit Us</h4>
            <p>Kings Horizon Building</p>
            <p>Kuppepadavu Junction, Kilenjaru Village</p>
            <p>Kuppepadavu Post, Mangalore Tq - 574144</p>
          </div>
        </div>

        <div className="footer-section contact">
          <div className="footer-icon">
            <Phone size={20} />
          </div>
          <div className="footer-text">
            <h4>Call Us</h4>
            <p>+91-824 226 5006</p>
            <p>+91-948 118 4338</p>
            <p>+91-916 460 6006</p>
            <p>+91-948 050 3017</p>
          </div>
        </div>

        <div className="footer-section social">
          <div className="footer-icon">
            <Mail size={20} />
          </div>
          <div className="footer-text">
            <h4>Connect</h4>
            <p>hithafamilyrestaurant@gmail.com</p>
            <div className="social-links">
              <Instagram size={16} />
              <span>hitha.familyrestaurant</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-services">
        <div className="service-banner">
          <div className="chef-character">
            <div className="chef-hat"></div>
            <div className="chef-face">
              <div className="chef-mustache"></div>
            </div>
          </div>
          <div className="service-text">
            <h3>We undertaking all types Catering Service Also</h3>
          </div>
        </div>
        
        <div className="delivery-info">
          <div className="delivery-icon">🛵</div>
          <div className="delivery-text">
            <h4>Free Delivery</h4>
            <p>within 2 km distance for Minimum order of Rs.300/-</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="thank-you">Thank You, visit again...</p>
        <p className="copyright">© 2024 Hitha Family Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );

  const CategoriesPage = () => (
    <div className="categories-page">
      <header className="page-header">
        <RestaurantLogo />
        
        <div className="header-content">
          <div className="header-tagline">
            <p className="main-tagline">Delicious food, served with love</p>
            <p className="sub-tagline">Authentic flavors • Fresh ingredients • Family recipes</p>
          </div>
          
          <div className="restaurant-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <Clock size={20} />
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Quick Service</span>
                <span className="highlight-desc">Fast & fresh</span>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <Users size={20} />
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Family Dining</span>
                <span className="highlight-desc">Perfect ambiance</span>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <Award size={20} />
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Quality Food</span>
                <span className="highlight-desc">Trusted recipes</span>
              </div>
            </div>
          </div>
          
          <div className="opening-hours">
            <h3>Opening Hours</h3>
            <div className="hours-grid">
              <div className="hours-item">
                <span className="day">Mon - Thu</span>
                <span className="time">11:00 AM - 10:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="day">Fri - Sun</span>
                <span className="time">11:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="menu-intro">
        <h2>Our Menu Categories</h2>
        <p>Choose from our carefully curated selection of authentic dishes</p>
      </div>

      {apiError && (
        <div className="api-error" style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '15px',
          margin: '0 20px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          {apiError}
        </div>
      )}

      <div className="categories-grid">
        {categories.map(category => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
            style={{ '--category-color': category.color }}
          >
            <div className="category-image-container">
              <img src={category.image} alt={category.name} />
              <div className="category-overlay">
                <div className="category-border">
                  <h3>{category.name}</h3>
                  <p>Authentic & Delicious</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );

  const ItemsPage = () => {
    const categoryData = categories.find(cat => cat.id === selectedCategory?.id);
    const items = getItemsForCategory(selectedCategory?.id);

    return (
      <div className="items-page">
        <header 
          className="items-header" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${categoryData?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <button className="back-btn" onClick={handleBackToCategories}>
            <ArrowLeft size={24} />
          </button>
          
          <div className="header-logo-small">
            <img 
              src="assets/hitha.jpg" 
              alt="Hitha Logo" 
              className="header-logo-img"
            />
          </div>
          
          <div className="header-content">
            <div className="category-title">
              <div className="ornamental-header">
                <div className="header-decoration"></div>
                <h2>{categoryData?.name}</h2>
                <div className="header-decoration"></div>
              </div>
              <p className="category-subtitle">Fresh • Delicious • Authentic</p>
            </div>
          </div>
        </header>

        <div className="menu-section">
          <div className="section-title">
            <div className="title-decoration">
              <div className="decorative-line"></div>
              <h3>MENU</h3>
              <div className="decorative-line"></div>
            </div>
          </div>
          
          <div className="items-list">
            {items.length === 0 ? (
              <div className="no-items">
                <p>No items found for this category.</p>
              </div>
            ) : (
              items.map(item => (
                <div key={item._id} className="item-card">
                  <div className="item-image">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=250&fit=crop'} 
                      alt={item.name} 
                    />
                  </div>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    {item.description && (
                      <div className="item-description">
                        <p>{item.description}</p>
                      </div>
                    )}
                    {item.portions && (item.portions.quarter > 0 || item.portions.half > 0 || item.portions.full > 0) && (
                      <div className="item-details">
                        {item.portions.quarter && item.portions.quarter > 0 && <span>Quarter: ₹{item.portions.quarter}</span>}
                        {item.portions.half && item.portions.half > 0 && <span>Half: ₹{item.portions.half}</span>}
                        {item.portions.full && item.portions.full > 0 && <span>Full: ₹{item.portions.full}</span>}
                      </div>
                    )}
                    <div className="item-footer">
                      <span className="item-price">{formatPrice(item)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(item._id)}
                    className={`item-favorite ${favorites.includes(item._id) ? 'active' : ''}`}
                  >
                    <Heart
                      size={18}
                      fill={favorites.includes(item._id) ? '#ff6b35' : 'none'}
                      color={favorites.includes(item._id) ? '#ff6b35' : 'white'}
                    />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    );
  };

  if (loading) {
    return <LoaderPage />;
  }

  return currentPage === 'categories' ? <CategoriesPage /> : <ItemsPage />;
};

export default Menu;