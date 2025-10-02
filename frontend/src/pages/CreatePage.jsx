import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import { Container } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useToast } from '@chakra-ui/react';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    // Validate form
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { success, message } = await createProduct(newProduct);
      
      if (success) {
        toast({
          title: "Success!",
          description: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Clear form
        setNewProduct({
          name: "",
          price: "",
          image: ""
        });
      } else {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={4}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"}>
          Create New Product
        </Heading>

        <Box w={"100%"} bg={useColorModeValue('white', 'gray.800')} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              value={newProduct.name}
              name='name'
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
              placeholder='Price'
              value={newProduct.price}
              name='price'
              type='number'
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
              placeholder='Image URL'
              value={newProduct.image}
              name='image'
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />

            <Button colorScheme='blue' w='full' onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
