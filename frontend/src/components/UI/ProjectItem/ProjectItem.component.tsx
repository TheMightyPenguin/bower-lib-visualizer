import React from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';
import { ProjectWithOwner } from 'types/apiTypes';

type ProjectItemProps = {
  project: ProjectWithOwner;
};

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <Flex padding="medium">
      <Box>
        <Box fontWeight="bold" marginBottom="xsmall">
          {project.homepage ? (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </Box>
        <Box>By: {project.owner}</Box>
      </Box>
      <Box margin="auto" />
      <Box>⭐️{project.stars} stars</Box>
    </Flex>
  );
};

export default ProjectItem;
