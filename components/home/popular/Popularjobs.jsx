import { useState } from "react";
import { useRouter } from "expo-router";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { COLORS, SIZES } from "../../../constants";

import styles from "./PopularJobs.style";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

const PopularJobs = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong!</Text>
        ) : (
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                keyExtractor={(item) => item?.job_id}
                contentContainerStyle={{ columGap: SIZES.medium }}
                horizontal
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default PopularJobs;
