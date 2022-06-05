const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    })
    return res.json({
      statusCode: 200,
      status: true,
      message: 'Successfully fetched products',
      data: products
    })
  } catch (error) {
    next(error)
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: { category: true }
    })
    return res.json({
      statusCode: 200,
      status: true,
      message: 'Successfully fetched product',
      data: product
    })
  } catch (error) {
    next(error)
  }
});

router.post('/products', async (req, res, next) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.categoryId = parseInt(req.body.categoryId);
    let {
      name,
      price,
      categoryId
    } = req.body
    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId
      },
      include: { category: true }
    })
    return res.json({
      statusCode: 200,
      status: true,
      message: 'Successfully created product',
      data: product
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.delete({
      where: {
        id: Number(id)
      },
      include: { category: true }
    })
    return res.json({
      statusCode: 200,
      status: true,
      message: 'Successfully deleted product',
      data: product
    })
  } catch (error) {
    next(error)
  }
});

router.patch('/products/:id', async (req, res, next) => {
  try {
    let {
      name,
      price,
      categoryId
    } = req.body
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        name,
        price,
        categoryId
      },
      include: { category: true }
    })
    return res.json({
      statusCode: 200,
      status: true,
      message: 'Successfully updated product',
      data: product
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
});

module.exports = router;
