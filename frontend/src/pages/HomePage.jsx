import { Container, SimpleGrid, VStack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';
import { useColorModeValue } from '@chakra-ui/react';

const HomePage = () => {

  const { products, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  
  return (
   <Container maxW='container.xl' px={12} >
    <VStack spacing={8}>
      <Text
        fontSize={"32px"}
        fontWeight={"bold"}
        bgGradient={"linear(to-r, cyan.400,blue.500)"}
        bgClip={"text"}
        textalign={"center"}
      >
      Currebt Products
      </Text>

      <SimpleGrid
      columns={
        {
         base: 1,
         md: 2,
         lg: 3
         }}
      spacing={10}
      w={"full"}
      >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}

      </SimpleGrid>
      {products.length === 0 && (
         <Text
        fontSize='xl' textAlign={"center"}
        fontWeight={"bold"}
        color='gray.500'
      >
      No Products Found 😔{""}
      <Link to={"/create"}>
      <Text as={"span"} color={"blue.500"} textDecoration={"underline"}>
      Create a Product
      </Text>
      </Link>
      </Text> 
      ) }
    </VStack>
   </Container>
  )
}

export default HomePage
