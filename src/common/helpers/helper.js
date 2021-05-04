export function parseCategories(categories) {
    categories = categories + "";
    let categoriesStr = "";
    let catArr = categories.split(',');
    catArr.forEach(cat => {
        categoriesStr += cat;
        categoriesStr += ", ";
    });
    categoriesStr = categoriesStr.trim();
    categoriesStr = categoriesStr.slice(0, -1);
    return categoriesStr;
}