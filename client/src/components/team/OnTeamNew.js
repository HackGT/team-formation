/* eslint-disable */
/* import "../css/TeamPage.css";
import React, { useState, useEffect} from 'react';
import {
   Editable,
   EditableInput,
   EditableTextarea,
   EditablePreview,
   IconButton,
   ButtonGroup,
   Flex,
   Input,
   useEditableControls
 } from '@chakra-ui/react';
 import { CheckIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';
*/ 
function OnTeamNew(props) {
  /*
   const[teamName, setTeamName] = useState(props.team.name);
   function EditableControls() {
       const {
         isEditing,
         getSubmitButtonProps,
         getCancelButtonProps,
         getEditButtonProps,
       } = useEditableControls()
  
       return isEditing ? (
         <ButtonGroup justifyContent='center' size='sm'>
           <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
           <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
         </ButtonGroup>
       ) : (
         <Flex justifyContent='center'>
           <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
         </Flex>
       )
     }
  */
     return (
      //  <Editable
      //    textAlign='center'
      //    defaultValue={teamName}
      //    fontSize='2xl'
      //    isPreviewFocusable={false}
      //  >
      //    <EditablePreview />
      //    {/* Here is the custom input */}
      //    <Input as={EditableInput} />
      //    <EditableControls />
      //  </Editable>
      <Button></Button>
     )
}
export default OnTeamNew;
