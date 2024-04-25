import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";

function Admin() {
  const [endpoint, setEndpoint] = useState("");
  const [links, setLinks] = useState([]);

  const handleSaveEndpoint = () => {
    const uniqueId = Date.now().toString();
    localStorage.setItem(uniqueId, JSON.stringify({ endpoint, links }));
    alert(`Shareable link: ${window.location.origin}/shared/${uniqueId}`);
    setEndpoint("");
    setLinks([]);
  };

  return (
    <Box p={8}>
      <h1>Admin Panel</h1>
      <Input placeholder="New Endpoint Name" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
      <Button onClick={handleSaveEndpoint} colorScheme="blue">
        Save Endpoint
      </Button>
      <p>Manage layouts and configurations here. Create and save different endpoints with specific sets of links.</p>
    </Box>
  );
}

export default Admin;
