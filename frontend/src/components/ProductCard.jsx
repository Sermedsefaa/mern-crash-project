import React from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { updateProduct } from "../../../backend/controllers/product.controller";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
    ModalFooter,
    Button,
    

  Input,
} from "@chakra-ui/react";
import { useState } from "react";
const ProductCard = ({ product, textColor = "gray.200" }) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (success) {
            toast({
                title: "Success!",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error",
                description: "Product update failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }
    const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }else {
            toast({
                title: "Success!",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }

    };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ shadow: "xl", transform: "translateY(-5px)" }}
        bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        w="full"
        h={48}
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2} mb={4}>
          <IconButton icon={<EditIcon />}
            colorScheme="blue" aria-label="Edit"
            onClick={onOpen}
            
             />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            aria-label="Delete"
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack spacing={4}>
                    <Input
                      placeholder='Name'
                      name='name'
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        
                    />
                    <Input
                      placeholder='Product Price'
                      name='price'
                      type='number'
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                     
                    />
                    <Input
                      placeholder='Product Image URL'
                      name='image'  
                          value={updatedProduct.image}  

                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}            
                    />
                
                </VStack>
            </ModalBody>

            <ModalFooter>
            <Button colorScheme='blue' mr={3}
            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
