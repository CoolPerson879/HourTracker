import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.number().required("Number is required"),
  category: Yup.string().required("Category is required"),
});

const FormScreen = ({ navigation }) => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const existingData = await AsyncStorage.getItem("formData");
      const formData = existingData ? JSON.parse(existingData) : [];
      formData.push(values);
      await AsyncStorage.setItem("formData", JSON.stringify(formData));
      resetForm();
      navigation.navigate("Data");
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            number: "",
            category: "Clinical",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.form}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {errors.name && touched.name ? (
                <Text style={styles.error}>{errors.name}</Text>
              ) : null}

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}

              <Text style={styles.label}>Number</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("number")}
                onBlur={handleBlur("number")}
                value={values.number}
                keyboardType="numeric"
              />
              {errors.number && touched.number ? (
                <Text style={styles.error}>{errors.number}</Text>
              ) : null}

              <Text style={styles.label}>Category</Text>
              <RNPickerSelect
                onValueChange={(value) => setFieldValue("category", value)}
                items={[
                  { label: "Clinical", value: "Clinical" },
                  { label: "Extracurricular", value: "Extracurricular" },
                  { label: "Shadowing", value: "Shadowing" },
                  { label: "Volunteer", value: "Volunteer" },
                  { label: "Research", value: "Research" },
                ]}
                style={{
                  inputIOS: styles.picker,
                  inputAndroid: styles.picker,
                  placeholder: { color: "#ccc" },
                }}
                value={values.category}
              />
              {errors.category && touched.category ? (
                <Text style={styles.error}>{errors.category}</Text>
              ) : null}

              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default FormScreen;
