import React, { useState } from "react";
import { Box, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Admin() {
  const [endpoint, setEndpoint] = useState("");
  const [links, setLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newLink, setNewLink] = useState({ name: "", url: "", image: "" });

  const handleSaveEndpoint = () => {
    localStorage.setItem("links_" + endpoint, JSON.stringify(links));
    setEndpoint("");
    setLinks([]);
  };

  const handleAddLink = () => {
    const endpointLinks = JSON.parse(localStorage.getItem("links_" + newLink.endpoint)) || [];
    localStorage.setItem("links_" + newLink.endpoint, JSON.stringify([...endpointLinks, { ...newLink, id: endpointLinks.length + 1 }]));
    setNewLink({ name: "", url: "", image: "" });
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const onClose = () => setIsOpen(false);

  return (
    <Box p={8}>
      <h1>Admin Panel</h1>
      <Input placeholder="New Endpoint Name" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />

      <Button onClick={handleSaveEndpoint} colorScheme="blue" mt={2}>
        Save to Specified Endpoint
      </Button>
      {links.map((link) => (
        <Box key={link.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <VStack>
            <Image src={link.image} alt={link.name} boxSize="100px" objectFit="cover" borderRadius="md" />
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
      <p>Manage layouts and configurations here. Create and save different endpoints with specific sets of links.</p>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder="Name" value={newLink.name} onChange={(e) => setNewLink({ ...newLink, name: e.target.value })} />
              <Input placeholder="URL" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} />
              <Input placeholder="Endpoint" value={newLink.endpoint} onChange={(e) => setNewLink({ ...newLink, endpoint: e.target.value })} />
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
}

export default Admin;
