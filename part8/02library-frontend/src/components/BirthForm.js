import React from "react";
import { gql, useMutation } from "@apollo/client";

const UPDATE_BIRTH = gql`
  mutation setBirthYear(
    $name: String!,
    $setBornTo: Int!
  ) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`;

const BirthForm = () => {

    const [setBirthYear] = useMutation(UPDATE_BIRTH);

   const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value
        const setBornTo = parseInt(event.target.born.value)

        setBirthYear({
            variables: { 
                name, 
                setBornTo
            },
        });
    }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        Author name: <input name="name" type="text" />
        <br />
        Birth year: <input name="born" type="number" />
        <br />
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default BirthForm;
