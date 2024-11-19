import React from "react";

const Sidebar = ({
                     isSidebarOpen,
                     categories,
                     handleCategoryClick,
                     handleSubcategoryClick,
                 }) => {
    return (
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <h3 className="sidebar-title">Categories</h3>
            <div className="category-list">
                {categories.map((category) => (
                    <details key={category.id} className="category-details">
                        {/* Category Header */}
                        <summary className="category-name">
                            <span onClick={(e) => {
                                e.stopPropagation(); // Prevent dropdown toggle
                                handleCategoryClick(category); // Navigate to category
                            }}>
                                {category.name}
                            </span>
                        </summary>

                        {/* Subcategories */}
                        <ul className="subcategory-list">
                            {(category.subcategories || []).map((subCategory) => (
                                <li
                                    key={subCategory.id}
                                    className="subcategory-item"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent collapsing category
                                        handleSubcategoryClick(subCategory); // Navigate to subcategory
                                    }}
                                >
                                    {subCategory.name}
                                </li>
                            ))}
                        </ul>
                    </details>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
