import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, ScrollView } from "react-native";
import { registerRootComponent } from "expo";


const proposals = [
  {
    title: "Proposal 0 - Put upgrades behind a timelock",
    program_id: "ATn9hbwGBFjcihRJ2a5BMJ9T8a9nyeXH54A3JWouAu6h",
    calldata: "0x4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f",
    accounts: [
      { pubkey: "9tXPRcvUJ12kR32KGB43yvM4RDvR53gM2JStZGUnftfa", is_writable: true, is_signer: false },
      { pubkey: "4VtKJ3JNK9rXbRHVb3eg9Q2Q8brZqGJDtZgrMzrWcmuC", is_writable: false, is_signer: true },
      { pubkey: "K5KJ3JNK9rXbRHVb3eg9Q2Q8brZqGJDtZgrMzrWcmuA", is_writable: true, is_signer: true },
    ],
  },
  {
    title: "Proposal 1 - Leveraged short ETH",
    program_id: "BcYhbwGBFjcihRJ2a5BMJ9T8a9nyeXH54A3JWouAu6h",
    calldata: "0x1234567890abcdef",
    accounts: [
      { pubkey: "3gXPRcvUJ12kR32KGB43yvM4RDvR53gM2JStZGUnftfa", is_writable: true, is_signer: false },
      { pubkey: "5VtKJ3JNK9rXbRHVb3eg9Q2Q8brZqGJDtZgrMzrWcmuC", is_writable: false, is_signer: true },
      { pubkey: "P5KJ3JNK9rXbRHVb3eg9Q2Q8brZqGJDtZgrMzrWcmuA", is_writable: true, is_signer: true },
    ],
  },
  {
    title: "Proposal 2 - Profit",
    program_id: "9cYhbwGBFjcihRJ2a5BMJ9T8a9nyeXH54A3JWouAu6h",
    calldata: "0xabcdef1234567890",
    accounts: [
      { pubkey: "1gXPRcvUJ12kR32KGB43yvM4RDvR53gM2JStZGUnftfa", is_writable: true, is_signer: false },
      { pubkey: "6VtKJ3JNK9rXbRHVb3eg9Q2Q8brZqGJDtZgrMzrWcmuC", is_writable: false, is_signer: true },
      { pubkey: "C5KJ3JNK9rXbRHVb3eg9Q2Q8brZqGJDtZgrMzrWcmuA", is_writable: true, is_signer: true },
    ],
  },
];

export function App() {
  const [selectedProposal, setSelectedProposal] = useState(null);

  const handleProposalClick = (item) => {
    setSelectedProposal(selectedProposal === item ? null : item);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#222", padding: 10 }}>
      <Text style={{ fontSize: 20, color: "#fff", textAlign: "left", paddingTop: 8, paddingLeft: 15 }}>Proposals</Text>
      <FlatList
        style={{ paddingTop: 15 }}
        data={proposals}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.proposalBox,
              selectedProposal === item ? styles.selectedProposal : null,
            ]}
            onPress={() => handleProposalClick(item)}
          >
            <Text style={styles.proposalText}>{item.title}</Text>
            {selectedProposal === item && (
              <View style={styles.proposalDescription}>
                <Text style={styles.jsonLabel}>Program ID</Text>
                <Text style={styles.jsonText}>
                  {item.program_id}
                </Text>
                <Text style={styles.jsonLabel}>Calldata</Text>
                <Text style={styles.jsonText}>
                  {item.calldata}
                </Text>
                <Text style={styles.jsonLabel}>Accounts</Text>
                <Text style={styles.jsonText}>
                  {JSON.stringify(item.accounts, null, 2)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  proposalBox: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    marginBottom: 10, // Added marginBottom to create space between proposal boxes
  },
  selectedProposal: {
    marginBottom: 20, // Adjust as needed for the expanded height
  },
  proposalText: {
    color: "#000",
  },
  proposalDescription: {
    backgroundColor: "#333", // Darker shade
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  descriptionTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  descriptionText: {
    color: "#fff",
    marginBottom: 5,
  },
  jsonBody: {
    backgroundColor: "#444", // Slightly darker shade
    padding: 10,
    borderRadius: 8,
  },
  jsonLabel: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  jsonText: {
    color: "#fff",
    fontFamily: "Courier New", // Use a monospaced font for JSON
  },
});


export default registerRootComponent(App);

