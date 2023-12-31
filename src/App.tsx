import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator, ScrollView, TouchableWithoutFeedback } from "react-native";
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
  const [expandedMarket, setExpandedMarket] = useState(null);
  const [isBuying, setIsBuying] = useState(true);

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

  const openProposalLink = (url) => {
    // Implement logic to open the URL, e.g., using Linking.openURL
    // For now, you can console.log the URL
    console.log("Opening proposal link:", url);
  };

  const handleMarketClick = (market) => {
    if (expandedMarket === market) {
      // If the clicked market is already open, close it
      setExpandedMarket(null);
    } else {
      // Otherwise, open the clicked market
      setExpandedMarket(market);
    }
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
            <Text style={styles.proposalText}>Proposal {item.account.number}</Text>
            {selectedProposal === item && (
              <View style={{ ...styles.proposalDescription, flexDirection: 'column' }}>
                <Text style={styles.jsonLabel}>Description</Text>
                <TouchableOpacity onPress={() => console.log("Link pressed", item.account.descriptionUrl)}>
                  <Text style={styles.proposalLink}>{item.account.descriptionUrl}</Text>
                </TouchableOpacity>

                {/* Pass Market */}
                <TouchableOpacity onPress={() => handleMarketClick('pass')}>
                  <View style={styles.marketBox}>
                    <Text style={styles.marketTitle}>Pass Market - 10.32 USDC</Text>
                    {expandedMarket === 'pass' && (
                      <View style={styles.marketDetails}>
                        {/* Toggle Button */}
                        <View 
                          style={{
                            backgroundColor: "#ccc",
                            borderRadius: 8,
                            alignSelf: "center",
                            marginBottom: 10,
                          }}
                        >
                          <TouchableOpacity 
                            onPress={() => setIsBuying(!isBuying)}
                            style={{
                              backgroundColor: "#fff",
                              paddingVertical: 5,
                              paddingHorizontal: 10,
                              borderRadius: 8,
                            }}
                          >
                            <Text style={{ fontSize: 14, color: "#000", textAlign: "center" }}>
                              {isBuying ? "Buying" : "Selling"}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View style={styles.amountItem}>
                          <Text style={styles.amountLabel}>You Pay</Text>
                          <TouchableWithoutFeedback>
                            <View style={styles.amountBox}>
                              <TextInput
                                style={styles.amountValue}
                                keyboardType="numeric"
                                placeholder="Enter amount"
                              />
                              <Image 
                                source={isBuying ? require('../assets/USDC.png') : require('../assets/META2.png')} 
                                style={styles.currencyIcon} 
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.amountItem}>
                          <Text style={styles.amountLabel}>You Receive</Text>
                          <View style={styles.amountBox}>
                            <Text style={[styles.amountValue, { textAlignVertical: 'center'}]}>132.3910</Text>
                            <Image 
                              source={isBuying ? require('../assets/META2.png') : require('../assets/USDC.png')} 
                              style={styles.currencyIcon} 
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>

                {/* Fail Market */}
                <TouchableOpacity onPress={() => handleMarketClick('fail')}>
                  <View style={styles.marketBox}>
                    <Text style={styles.marketTitle}>Fail Market - 8.23 USDC</Text>
                    {expandedMarket === 'fail' && (
                      <View style={styles.marketDetails}>
                        {/* Toggle Button */}
                        <View 
                          style={{
                            backgroundColor: "#ccc",
                            borderRadius: 8,
                            alignSelf: "center",
                            marginBottom: 10,
                          }}
                        >
                          <TouchableOpacity 
                            onPress={() => setIsBuying(!isBuying)}
                            style={{
                              backgroundColor: "#fff",
                              paddingVertical: 5,
                              paddingHorizontal: 10,
                              borderRadius: 8,
                            }}
                          >
                            <Text style={{ fontSize: 14, color: "#000", textAlign: "center" }}>
                              {isBuying ? "Buying" : "Selling"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                  
                        <View style={styles.amountItem}>
                          <Text style={styles.amountLabel}>You Pay</Text>
                          <TouchableWithoutFeedback>
                            <View style={styles.amountBox}>
                              <TextInput
                                style={styles.amountValue}
                                keyboardType="numeric"
                                placeholder="Enter amount"
                              />
                              <Image 
                                source={isBuying ? require('../assets/USDC.png') : require('../assets/META2.png')} 
                                style={styles.currencyIcon} 
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.amountItem}>
                          <Text style={styles.amountLabel}>You Receive</Text>
                          <View style={styles.amountBox}>
                            <Text style={styles.amountValue}>50.3223</Text>
                            <Image 
                              source={isBuying ? require('../assets/META2.png') : require('../assets/USDC.png')} 
                              style={styles.currencyIcon} 
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>

                {/* Remaining Proposal Details */}
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
  },

  marketTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },

  priceText: {
    color: "#fff",
  },

  marketDetails: {
    marginTop: 10,
  },
  amountBox: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 8,
  height: 40, // Adjust the height as needed
  marginBottom: 5,
  paddingLeft: 5,
  position: 'relative',
},

currencyIcon: {
  position: 'absolute',
  right: 5, // Adjust as needed
  top: '50%',
  transform: [{ translateY: -12 }], // Center the icon vertically
  width: 24,
  height: 24,
},
amountValue: {
  borderColor: 'gray',
  borderWidth: 0,
  borderRadius: 5,
  paddingLeft: 5,
  color: '#000',
  textAlignVertical: 'center', // Center the text vertically
  justifyContent: 'center', // Center the content vertically
},
  marketText: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },

  proposalLink: {
    color: "#007BFF", // Add your desired link color
    textDecorationLine: "underline",
    marginBottom: 10, // Adjust as needed for spacing
  },

  amountItem: {
    marginBottom: 10, // Add space between items
  },

  amountLabel: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
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

