import { useState } from "react";
import { useRouter } from "expo-router";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import useFetch from "../../../hook/useFetch";
import { COLORS, SIZES } from "../../../constants";

import styles from "./PopularJobs.style";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

const PopularJobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();

  const { isLoading, error, data } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

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
            data={data}
            keyExtractor={(item) => item?.job_id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handleCardPress={handleCardPress}
                selectedJob={selectedJob}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default PopularJobs;
