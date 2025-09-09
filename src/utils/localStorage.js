// Key names for localStorage
const STORAGE_KEYS = {
  PRODUCTS: "localshop_products",
  INVOICES: "localshop_invoices",
  CUSTOMERS: "localshop_customers",
  SETTINGS: "localshop_settings",
};

// CRUD Operations for Products
export const getProducts = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return data ? JSON.parse(data) : [];
};

export const saveProduct = (product) => {
  const products = getProducts();
  // If product has an ID, update existing, else add new
  if (product.id) {
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products[index] = product;
    }
  } else {
    // Generate a unique ID for the new product
    product.id = Date.now().toString();
    products.push(product);
  }
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return product; // Return the saved product (with its new ID)
};

export const deleteProduct = (productId) => {
  const products = getProducts().filter((p) => p.id !== productId);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};

// CRUD Operations for Invoices (Bills)
export const getInvoices = () => {
  const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
  return data ? JSON.parse(data) : [];
};

export const saveInvoice = (invoice) => {
  const invoices = getInvoices();
  invoice.id = invoice.id || `INV-${Date.now()}`; // Generate unique invoice ID
  invoice.date = new Date().toISOString(); // Set timestamp
  invoices.push(invoice);
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));

  // Update product stock levels
  const products = getProducts();
  invoice.items.forEach((item) => {
    const productIndex = products.findIndex((p) => p.id === item.productId);
    if (productIndex !== -1) {
      products[productIndex].stockQuantity -= item.quantity;
      // Prevent stock from going negative
      if (products[productIndex].stockQuantity < 0) {
        products[productIndex].stockQuantity = 0;
      }
    }
  });
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

  return invoice;
};

// Get a single invoice by ID
export const getInvoiceById = (invoiceId) => {
  const invoices = getInvoices();
  return invoices.find((invoice) => invoice.id === invoiceId);
};

// Customer CRUD operations
export const getCustomers = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
  return data ? JSON.parse(data) : [];
};

export const saveCustomer = (customer) => {
  const customers = getCustomers();
  // Check if customer already exists by mobile
  const existingIndex = customers.findIndex(
    (c) => c.mobile === customer.mobile
  );

  if (existingIndex !== -1) {
    // Update existing customer
    customers[existingIndex] = { ...customers[existingIndex], ...customer };
  } else {
    // Add new customer
    customers.push(customer);
  }

  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  return customer;
};

export const getCustomerByMobile = (mobile) => {
  const customers = getCustomers();
  return customers.find((c) => c.mobile === mobile);
};

// Removed the separate updateProductStock function since its logic is now inside saveInvoice.
