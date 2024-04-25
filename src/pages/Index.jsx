import { useState, useEffect } from "react";
import { Box, SimpleGrid, IconButton, Image, Input, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, VStack, HStack } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const endpoint = window.location.pathname.replace("/", "") || "default";
    const savedLinks = JSON.parse(localStorage.getItem("links_" + endpoint)) || [];
    setLinks(savedLinks);
  }, []);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newLink, setNewLink] = useState({ name: "", url: "", image: "" });

  const handleAddLink = () => {
    const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${newLink.url}&sz=64`;
    setLinks([...links, { ...newLink, image: faviconUrl, id: links.length + 1 }]);
    onClose();
    setNewLink({ name: "", url: "", image: "" });
  };

  const handleDelete = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <Box p={8}>
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between">
          <VStack spacing={4} align="center">
            <Image src="/path/to/logo.png" boxSize="100px" />
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Company Resource Links
            </Text>
          </VStack>
          <IconButton icon={<FaPlus />} onClick={onOpen} colorScheme="blue" aria-label="Add link" />
        </HStack>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10}>
          {links.map((link) => (
            <Box key={link.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" as="a" href={`https://${link.url}`} target="_blank" _hover={{ textDecoration: "none" }}>
              <VStack>
                <Image src={link.image} alt={link.name} boxSize="100px" objectFit="cover" borderRadius="md" />
                <Text mt={4} fontSize="lg" fontWeight="bold">
                  {link.name}
                </Text>
                <HStack></HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Index;
