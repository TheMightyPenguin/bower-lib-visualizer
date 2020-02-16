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
    <Flex>
      <Box padding="small">{project.name}</Box>
      <Box padding="small">{project.stars}</Box>
      <Box padding="small">{owner}</Box>
    </Flex>
  );
};

export default ProjectItem;
