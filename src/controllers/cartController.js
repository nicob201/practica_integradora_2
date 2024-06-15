import cartModel from "../dao/models/cart.model.js";
import userModel from "../dao/models/user.js";

// Devuelve todos los carritos
async function getCarts(req, res) {
  try {
    let carts = await cartModel.find().populate("products.product");
    res.json(carts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "Failed to fetch carts!" });
  }
}

// Devuelve un carrito por su ID
async function getCartById(req, res) {
  let { cid } = req.params;
  try {
    let result = await cartModel.findById({ _id: cid }).populate("products");
    if (!result) {
      return res.status(404).send({ status: "error", error: "Cart not found!" });
    }
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "Failed to fetch cart!" });
  }
}

// Crea un carrito con los ID de los productos seleccionados
// Si se pasa cantidad de unidades se agrega ese monto a "units", sino por defecto es 1
// Es necesario que haya una sesion iniciada de algun usuario
async function createCart(req, res) {
  const { productId, units = 1 } = req.body;
  const userId = req.user._id;

  if (!userId) {
    return res.status(400).send({ status: "error", error: "User not authenticated!" });
  }

  if (!productId) {
    return res.status(400).send({ status: "error", error: "Product ID is required!" });
  }

  try {
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = await cartModel.create({
        user: userId,
        products: [{ product: productId, units }],
      });
      await cart.save();
      await userModel.findByIdAndUpdate(userId, {
        $push: { cart: { id: cart._id } },
      });
      return res.send({ result: "Success adding product to cart!" });
    }

    const existingProduct = cart.products.find((item) => item.product._id.toString() === productId);

    if (existingProduct) {
      existingProduct.units += parseInt(units);
    } else {
      cart.products.push({ product: productId, units });
    }
    await cart.save();
    res.send({ result: "Success adding product to cart!" });
  } catch (error) {
    console.error("Error adding product to cart!:", error);
    res.status(500).send({ status: "error", error: "Failed to add product to cart!" });
  }
}

// Borra todo el carrito
async function deleteCart(req, res) {
  let { cid } = req.params;
  try {
    let result = await cartModel.deleteOne({ _id: cid });
    if (!result.deletedCount) {
      return res.status(404).send({ status: "error", error: "Cart not found!" });
    }
    res.send({ result: "Success deleting cart!", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "Failed to delete cart!" });
  }
}

// Renderiza los carritos en el front
async function renderCarts(req, res) {
  try {
    const carts = await cartModel.find().populate("products.product").lean();
    res.render("carts", { carts: carts, });
  } catch (error) {
    console.log("Error fetching carts:", error);
    res.status(500).send({ status: "error", error: "Failed to fetch carts!" });
  }
}

// Elimina un producto dado su ID de un carrito
async function deleteProductFromCart(req, res) {
  const { cid, pid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      return res.status(404).send({ status: "error", error: "Cart not found!" });
    }

    cart.products = cart.products.filter((product) => product.product._id != pid);
    await cart.save();

    res.send({ result: "Success removing product from cart!" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).send({ status: "error", error: "Failed to remove product from cart!" });
  }
}

// Actualiza la cantidad de un producto en un carrito
async function updateProductUnits(req, res) {
  const { cid, pid } = req.params;
  const { units } = req.body;

  if (!units || isNaN(units) || units < 0) {
    return res.status(400).send({ status: "error", error: "Invalid units provided" });
  }

  try {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      return res.status(404).send({ status: "error", error: "Cart not found!" });
    }

    const existingProduct = cart.products.find((item) => item.product._id.toString() === pid);

    if (existingProduct) {
      existingProduct.units += parseInt(units);
    } else {
      cart.products.push({ product: pid, units });
    }

    await cart.save();

    res.send({ result: "Success updating product units in cart!" });
  } catch (error) {
    console.error("Error updating product units in cart:", error);
    res.status(500).send({ status: "error", error: "Failed to update product units in cart!" });
  }
}

export {
  getCarts,
  getCartById,
  createCart,
  deleteCart,
  renderCarts,
  deleteProductFromCart,
  updateProductUnits,
};
