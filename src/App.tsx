import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, ScrollView } from "react-native";
import { registerRootComponent } from "expo";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

import { Buffer } from "buffer";
window.Buffer = Buffer;

import { useSolanaProvider } from "./hooks/xnft-hooks";

import { AutocratV0 } from "./idl/autocrat_v0";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const AutocratIDL: AutocratV0 = require("./idl/autocrat_v0.json");

const AUTOCRAT_PROGRAM_ID = new anchor.web3.PublicKey(
  "Ctt7cFZM6K7phtRo5NvjycpQju7X6QTSuqNen2ebXiuc"
); 


export function App() {
  let provider = useSolanaProvider();
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposals, setProposals] = useState([]);

  const handleProposalClick = (item) => {
    setSelectedProposal(selectedProposal === item ? null : item);
  };

  async function getProposals(): Promise<any> {
    console.log(provider);
    console.log(window.xnft.solana);
    const autocratProgram = new Program(AutocratIDL, AUTOCRAT_PROGRAM_ID, provider);
    const proposals = await autocratProgram.account.proposal.all();
    console.log(proposals[0]);
    return proposals;
  }

  useEffect(() => {
    getProposals().then((proposals) => {
      setProposals(proposals);
    });
  }, [provider]); // provider gets asynchronously set, so we need to wait for it to be set before we can use it

 

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
            <Text style={styles.proposalText}>Proposal {item.account.number}</Text>
            {selectedProposal === item && (
              <View style={{...styles.proposalDescription, flexDirection: 'column'}}>
                <View style={{flex: 1}}>
                  <View style={styles.marketBox}>
                    <Text style={styles.marketText}>Pass Market</Text>
                    <Text style={styles.priceText}>Price: $10</Text>
                    <View style={styles.amountBox}>
                      <View style={styles.amountItem}>
                        <Text style={styles.amountLabel}>You Pay</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                          <TextInput
                            style={styles.amountInput}
                            keyboardType="numeric"
                            placeholder="Enter amount"
                            // You can add state to manage the value entered by the user
                            // For example: value={payValue} onChangeText={(text) => setPayValue(text)}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.amountItem}>
                        <Text style={styles.amountLabel}>You Receive</Text>
                        <Text style={styles.amountValue}>10 Tokens</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <View style={styles.marketBox}>
                    <Text style={styles.marketText}>Fail Market</Text>
                    <Text style={styles.priceText}>Price: $8</Text>
                    <View style={styles.amountBox}>
                      <View style={styles.amountItem}>
                        <Text style={styles.amountLabel}>You Pay</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                          <TextInput
                            style={styles.amountInput}
                            keyboardType="numeric"
                            placeholder="Enter amount"
                            // You can add state to manage the value entered by the user
                            // For example: value={payValue} onChangeText={(text) => setPayValue(text)}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.amountItem}>
                        <Text style={styles.amountLabel}>You Receive</Text>
                        <Text style={styles.amountValue}>5 Tokens</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Text style={styles.jsonLabel}>Program ID</Text>
                <Text style={styles.jsonText}>
                  {item.account.instruction.programId.toString()}
                </Text>
                <Text style={styles.jsonLabel}>Calldata</Text>
                <Text style={styles.jsonText}>
                  {'0x' + Buffer.from(item.account.instruction.data).toString('hex')}
                </Text>
                <Text style={styles.jsonLabel}>Accounts</Text>
                <Text style={styles.jsonText}>
                  {JSON.stringify(item.account.instruction.accounts, null, 2)}
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
    flexDirection: "row",
  },
  marketBoxContainer: {
    flexDirection: 'row', // This will make the boxes sit side by side
    justifyContent: 'space-between', // Add space between boxes
    flex: 1,
  },
  marketBox: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flex: 1,
  },
  amountInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    marginBottom: 5,
    color: '#fff',
  },

  marketText: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },

  priceText: {
    color: "#fff",
  },

  amountBox: {
    marginTop: 10, // Add space between market text and "You Pay" element
  },

  amountItem: {
    marginBottom: 10, // Add space between items
  },

  amountLabel: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },

  amountValue: {
    color: "#fff",
  },
  marketInfo: {
    backgroundColor: "#555", // Lighter shade for the market info box
    padding: 10,
    borderRadius: 8,
    marginBottom: 10, // Added marginBottom for spacing
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

