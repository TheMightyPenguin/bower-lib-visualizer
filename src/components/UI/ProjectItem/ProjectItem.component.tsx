import React from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';
import { Project } from 'types/apiTypes';

type ProjectItemProps = {
  project: Project;
};

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const owner = project.repository_url.split('/').splice(-2, 1);
  return (
    <Flex padding="medium">
      <Box>
        <Box fontWeight="bold" marginBottom="xsmall">
          {project.homepage ? (
            <a href={project.homepage}>{project.name}</a>
          ) : (
            project.name
          )}
        </Box>
        <Box>By: {owner}</Box>
      </Box>
      <Box margin="auto" />
      <Box>⭐️{project.stars} stars</Box>
    </Flex>
  );
};

export default ProjectItem;
