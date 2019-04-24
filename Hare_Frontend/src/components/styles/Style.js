//
import Colors from './Color';
import React, { Component } from 'react'; 
import {
    Text,
} from "grommet";
import * as Icons from "grommet-icons";

const Title = (input, colors) => { 
    let apply = "#8292A6";
    if(colors != undefined || colors != null) { 
        apply = colors;
    }
    return( 
		<Text size="36pt" color={apply}> 
			{input} 
		</Text> 
    );
};

const SubTitle = (input) => { 
    let ptsize = "12pt";
    return( 
		<Text size={ptsize} color={Colors.grey1}> 
			{input}
		</Text> 
    );
};

const Hint = (hint, colors) => { 
    let ptsize = "12pt"; 
    let ptcolor = Colors.grey2;
    return( 
        <Text size={ptsize} color={ptcolor}>
            {hint}
        </Text> 
    );
};

const Body = (input) => { 
    let ptsize = "12pt"; 
    let ptcolor = Colors.dark3; 
    return( 
        <Text size={ptsize} color={ptcolor}> 
            {input}
        </Text> 
    );
};

const BodyColored = (input, color) => { 
    let ptsize = "12pt"; 
    let ptcolor = color; 
    return(
        <Text size={ptsize} color={ptcolor}>
            {input}
        </Text> 
    );
};

const ColorIndex = {
    0: "#ff0000", 
    1: "#ff9900",
    2: "#ffcc00", 
    3: "#00cc00", 
    4: "#33cccc", 
    5: "#3366ff", 
} 

export default { 
    Title, 
    SubTitle, 
    Hint, 
    Body, 
    BodyColored, 
    ColorIndex,
}