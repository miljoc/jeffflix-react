import { rgba } from 'polished';
import styled from 'styled-components';

const ResumeOption = styled.button`
    background: none;
    padding: 0;
    width: 100%;
    border: none;
    text-align: left;
    color: ${(props) => rgba(props.theme.white, 0.38)};
    line-height: 4rem;
    font-size: ${(props) => props.theme.typography.body};
    transition: ${(props) => props.theme.base.transitionSpeed} all;

    &:hover {
        color: ${(props) => props.theme.white};
    }
`;

export default ResumeOption;
