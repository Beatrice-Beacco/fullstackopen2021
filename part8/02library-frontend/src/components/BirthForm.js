import React from "react";
import Select from "react-select";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

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


const BirthForm = ({allAuthorsQuery, authorNames}) => {

    const [selectedOption, setSelectedOption] = useState(null);

    const [setBirthYear] = useMutation(UPDATE_BIRTH, {
    refetchQueries: [  {query: allAuthorsQuery } ],
    onError: (error) => {
      console.log(error);
    }   
    })

   const handleSubmit = (event) => {
        event.preventDefault();
        const setBornTo = parseInt(event.target.born.value)

        setBirthYear({
            variables: { 
                name: selectedOption.value, 
                setBornTo
            },
        });
    }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        Author name:
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={authorNames}
        />
        <br />
        Birth year: <input name="born" type="number" />
        <br />
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default BirthForm;
