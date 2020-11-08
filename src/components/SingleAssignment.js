import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  CardItem,
  Text,
  Icon,
  Left,
  Body,
  Badge,
  Button,
  Item,
} from "native-base";
import Assignments from "../modules/assignments";
import { useSelector } from "react-redux";

const SingleAssignment = ({ route }) => {
  const [assignment, setAssignment] = useState({});
  const authenticated = useSelector((state) => state.authenticated);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getSingleAssignment = async () => {
      const response = await Assignments.show(
        route.params.assignmentId,
        authenticated
      );
      if (response.id) {
        setAssignment(response);
      } else {
        setMessage(response);
      }
    };
    getSingleAssignment();
  }, [route]);

  const applyHandler = () => {
    let response = await Assignments.apply(route.params.assignmentId, applicantId)
    
  }


  return (
    <>
      <Card>
        <CardItem header bordered style={styles.titleCard}>
          <Left>
            <Icon name="laptop" />
            <Body>
              <Text testID="title" style={styles.title}>
                {assignment.title}
              </Text>
              <Text testID="budget" style={styles.budget} note>
                $ {assignment.budget}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={styles.descriptionCard}>
          <Body>
            <Text testID="description" style={styles.description}>
              {assignment.description}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer bordered style={styles.container}>
          <Left testID="points">
            <Text note style={styles.container2}>
              Points:
            </Text>
            <Badge primary>
              <Text>{assignment.points}</Text>
            </Badge>
          </Left>
          <Body>
            <Text testID="skills" note style={styles.cardSkills}>
              Skills: {assignment.skills}
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Button testID="applyButton" block onPress={() => applyHandler()}>
        <Text>Apply now</Text>
      </Button>
      <Text>
        {message && (
          <Item style={styles.banner}>
            <Text style={styles.bannerText}>{message}</Text>
          </Item>
        )}
      </Text>
    </>
  );
};

export default SingleAssignment;

const styles = StyleSheet.create({
  titleCard: {
    backgroundColor: "#4A6572",
  },
  container: {
    backgroundColor: "#4A6572",
  },
  cardSkills: {
    color: "#ffff",
  },
  title: {
    fontSize: 30,
  },
  budget: {
    fontSize: 20,
    color: "#0a0d10",
  },
  description: {
    fontSize: 22,
  },
  descriptionCard: {
    backgroundColor: "#d0dce2",
  },
  banner: {
    backgroundColor: "red",
  },
  bannerText: {
    fontSize: 22,
  },
});