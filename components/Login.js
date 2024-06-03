import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const LoginScreen = ({ navigation }) => {
  const handleLogin = async (values) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(values));
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving user data", error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName ? (
              <Text style={styles.error}>{errors.firstName}</Text>
            ) : null}

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName ? (
              <Text style={styles.error}>{errors.lastName}</Text>
            ) : null}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
