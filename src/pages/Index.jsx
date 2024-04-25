import { useState } from "react";
import { Box, SimpleGrid, IconButton, Image, Input, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, VStack, HStack } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [links, setLinks] = useState([
    { id: 1, name: "Google", url: "https://www.google.com", image: 'https://images.unsplash.com/photo-1553895501-af9e282e7fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBob21lcGFnZXxlbnwwfHx8fDE3MTQwNTk3NjV8MA&ixlib=rb-4.0.3&q=80&w=1080' },
    { id: 2, name: "Facebook", url: "https://www.facebook.com", image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmYWNlYm9vayUyMGhvbWVwYWdlfGVufDB8fHx8MTcxNDA1OTc2NXww&ixlib=rb-4.0.3&q=80&w=1080' },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newLink, setNewLink] = useState({ name: "", url: "", image: "" });

  const handleAddLink = () => {
    setLinks([...links, { ...newLink, id: links.length + 1 }]);
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
          <Text fontSize="2xl" fontWeight="bold">
            Company Resource Links
          </Text>
          <IconButton icon={<FaPlus />} onClick={onOpen} colorScheme="blue" aria-label="Add link" />
        </HStack>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={10}>
          {links.map((link) => (
            <Box key={link.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
              <VStack>
                <Image src={link.image} alt={link.name} boxSize="150px" objectFit="cover" borderRadius="md" />
                <Text mt={4} fontSize="lg" fontWeight="bold">
                  {link.name}
                </Text>
                <HStack>
                  <IconButton icon={<FaEdit />} colorScheme="yellow" aria-label="Edit link" />
                  <IconButton icon={<FaTrash />} colorScheme="red" aria-label="Delete link" onClick={() => handleDelete(link.id)} />
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder="Name" value={newLink.name} onChange={(e) => setNewLink({ ...newLink, name: e.target.value })} />
              <Input placeholder="URL" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} />
              <Input placeholder="Image URL" value={newLink.image} onChange={(e) => setNewLink({ ...newLink, image: e.target.value })} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddLink}>
              Add Link
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;