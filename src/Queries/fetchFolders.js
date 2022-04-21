import gql from 'graphql-tag';

const FETCH_FOLDERS = gql`
	query folders($fullPath: Boolean, $path: String!) {
		folders(fullPath: $fullPath, path: $path)
	}
`;

export default FETCH_FOLDERS;