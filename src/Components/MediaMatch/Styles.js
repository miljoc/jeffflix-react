import styled from 'styled-components';

export const Match = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    text-align: left;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    
    small, label {
        display: flex;
        height: 100%;
        width: 100%;
        opacity: 0.7;
        font-size: 80%;
        align-items: center;
        cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};

        &:hover {
            color: #FF9B3D;
        }
    }

`;

export const MovieMatch = styled(Match)`
    text-align: left;
`;

export const EpisodeMatch = styled(Match)`
    input[type="checkbox"] {
        position: absolute; // take it out of document flow
        opacity: 0; // hide it

        & + label {
            position: relative;
            cursor: pointer;

            &:after {
                content: '';
                position: absolute;
                opacity: 0;
                left: 5px;
                top: 50%;
                background: white;
                width: 2px;
                height: 2px;
                box-shadow: 
                2px 0 0 white,
                4px 0 0 white,
                4px -2px 0 white,
                4px -4px 0 white,
                4px -6px 0 white,
                4px -8px 0 white;
                transform: translateY(-50%) rotate(45deg);      
                transition: opacity 0.2s ease-in-out;
            }
        }

        // Box.
        & + label:before {
            content: '';
            margin-right: 10px;
            display: inline-block;
            vertical-align: text-top;
            width: 20px;
            height: 20px;
            background: rgba(0,0,0,0.5);
        }

        // Box hover
        &:hover + label:before {
            background: rgba(0,0,0,0.5);
        }

        &:hover + label:after {
            opacity: 0.5;
        }

        // Box focus
        &:focus + label:before {
            box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
        }

        // Box checked
        &:checked + label:before {
            background: rgba(0,0,0,0.3);
        }        

        // Disabled state label.
        &:disabled + label {
            color: #b8b8b8;
            cursor: auto;
        }

        // Disabled box.
        &:disabled + label:before {
            box-shadow: none;
            background: #ddd;
        }

        // Checkmark. Could be replaced with an image
        &:checked + label:after {
            content: '';
            opacity: 1;
            position: absolute;
            left: 5px;
            top: 50%;
            background: white;
            width: 2px;
            height: 2px;
            box-shadow: 
            2px 0 0 white,
            4px 0 0 white,
            4px -2px 0 white,
            4px -4px 0 white,
            4px -6px 0 white,
            4px -8px 0 white;
            transform: translateY(-50%) rotate(45deg);
        }
    }
`