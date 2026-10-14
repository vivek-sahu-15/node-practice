import { FlatList, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function Index() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editUserId, setEditUserId] = useState(null);


  function handleEdit(user) {
    setEditUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setContact(user.contact);
    setAge(user.age);
    setAddress(user.address);

    setEditModalVisible(true);
  }

  function handleDelete(user) {
    setUsers((prevUsers) =>
      prevUsers.filter((item) => item.id !== user.id)
    );
  }


  function handleUpdate() {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editUserId
          ? {
            ...user,
            name,
            email,
            contact,
            age,
            address,
          }
          : user
      )
    );

    setEditModalVisible(false);
    setEditUserId(null);

    setName("");
    setEmail("");
    setContact("");
    setAge("");
    setAddress("");
  }

  const editModal = () => (
    <Modal
      visible={editModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View className="flex-1 justify-center bg-black/50 px-5">
        <View className="rounded-2xl bg-white p-5">
          <Text className="mb-5 text-2xl font-bold text-gray-900">
            Edit User
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            className="mb-3 rounded-xl border border-gray-200 px-4 py-3"
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-3 rounded-xl border border-gray-200 px-4 py-3"
          />

          <TextInput
            value={contact}
            onChangeText={setContact}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            className="mb-3 rounded-xl border border-gray-200 px-4 py-3"
          />

          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="Age"
            keyboardType="numeric"
            className="mb-3 rounded-xl border border-gray-200 px-4 py-3"
          />

          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            className="mb-5 min-h-24 rounded-xl border border-gray-200 px-4 py-3"
          />

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleUpdate}
              className="flex-1 rounded-xl bg-blue-600 py-3"
            >
              <Text className="text-center font-bold text-white">
                Update
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              className="flex-1 rounded-xl bg-gray-200 py-3"
            >
              <Text className="text-center font-bold text-gray-800">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );



  const renderItem = ({ item }) => (
    <View className="mb-4 rounded-lg bg-white p-4 shadow">
      <Text className="text-lg font-semibold text-gray-900">
        {item.name}
      </Text>
      {/* <Text className="text-gray-700">{item.id}</Text> */}
      <Text className="text-gray-700">{item.email}</Text>
      <Text className="text-gray-700">{item.contact}</Text>
      <Text className="text-gray-700">{item.age}</Text>
      <Text className="text-gray-700">{item.address}</Text>

      <View className="mt-4 flex-row justify-end space-x-4 gap-3">

        <TouchableOpacity
          onPress={() => handleEdit(item)}
          className="rounded-lg bg-blue-500 px-4 py-2"
        >
          <Text className="text-white">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item)}
          className="rounded-lg bg-red-500 px-4 py-2"
        >
          <Text className="text-white">Delete</Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  function handleSubmit() {
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      contact,
      age,
      address,
    };

    setUsers([...users, newUser]);

    // Optional: clear form after submitting
    setName("");
    setEmail("");
    setContact("");
    setAge("");
    setAddress("");
  }

  const form = (
    <View>
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-gray-900">
          Fill the Details
        </Text>

        <Text className="mt-2 text-base text-gray-500">
          Enter your information below
        </Text>
      </View>

      {/* Form Card */}
      <View className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

        {/* Name */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Full Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor="#9CA3AF"
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900"
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Email
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900"
          />
        </View>

        {/* Phone */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Phone Number
          </Text>

          <TextInput
            value={contact}
            onChangeText={setContact}
            placeholder="Enter your phone number"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900"
          />
        </View>

        {/* Age */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Age
          </Text>

          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900"
          />
        </View>

        {/* Address */}
        <View className="mb-5">
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Address
          </Text>

          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            className="min-h-24 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900"
          />
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="rounded-xl bg-blue-600 py-4"
        >
          <Text className="text-center text-base font-bold text-white">
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-4 text-2xl font-bold text-gray-900">
        Submitted Users
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <FlatList
        data={users}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.id}
        ListHeaderComponent={form}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 24,
        }}

      />
      {editModal()}

    </SafeAreaView>
  );
}