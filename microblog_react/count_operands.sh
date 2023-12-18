#!/bin/bash

# This should work generically for angular & react
IDENTIFIER="\w+(?=\s)|(?<=\.)\w+$|\w+(?=,)|\w+(?=;)|\w+(?=:)|\w+(?=\.)|(?<=\()\w+(?=\))|\w+(?=\))|\w+(?=\[)|(?<=[\.\{])\w+(?=\})"
TYPENAME="bool |any |string |number |void "
# CONSTANT="'\w+'|(\s|=)\[0-9]+|\[0-9]+\.\[0-9]*"
# TODO: How to ignore numbers at beginning of a string constant, like '55 comments'?
CONSTANT="'.*?'|\`.*\`|\".*\"|(?<!')(?<!\w)(\d+(\.\d+)?)(?!')"

RESERVED='(^@[A-Z]\w+$)|^as$|^static$|^const$|^from$|^let$|^private$|^protected$|^public$|^export$|^var$|^if$|^import$|^else$|^break$|^case$|^class$|^continue$|^default$|^do$|^for$|^new$|^return$|^switch$|^while$|^this$|^try$|^catch$|^throw$|^throws$|^finally$|^instanceof$|^interface$|^extends$|^implements$|^abstract$'

PATTERN="$IDENTIFIER|$TYPENAME|$CONSTANT"

COMMENTS='^ *//|^ */\*\*|^ *\*|^ *<\!--'
TAGS='<.+.*|[?:].+<.+>.*'
#FUNCS='function |[a-z]+\(.*\) \{'
#SPECIALS='^import '

EXCEPTIONS="$COMMENTS|$TAGS" #|$FUNCS|$SPECIALS"


echo "File: $1"
echo "-----------------------------"

#ack "$PATTERN" $1
#ack -c "$PATTERN" $1
echo "with filtering:"
echo "==============="
egrep -v "$EXCEPTIONS" $1 | grep -Po "$PATTERN" | egrep -v "$RESERVED" | sort -n | uniq -c
echo -n "Total operands (first run): "
resN1=`egrep -v "$EXCEPTIONS" $1 | grep -Po "$PATTERN" | egrep -v "$RESERVED" | sort -n | uniq -c | awk '{print $1}' | paste -sd+ | bc`
resn1=`egrep -v "$EXCEPTIONS" $1 | grep -Po "$PATTERN" | egrep -v "$RESERVED" | sort -n | uniq -c | wc -l`
echo "$resN1 of $resn1 unique operands"
echo
echo "2nd run / corrections: "
egrep -v "$EXCEPTIONS" $1 | grep -Po "$CORRECTIONS" | sort -n | uniq -c
corrN1=`egrep -v "$EXCEPTIONS" $1 | grep -Po "$CORRECTIONS" | sort -n | uniq -c | awk '{print $1}' | paste -sd+ | bc`
corrn1=`egrep -v "$EXCEPTIONS" $1 | grep -Po "$CORRECTIONS" | sort -n | uniq -c | wc -l`
let corrN1=$corrN1+0
echo -n "Total corrections to count: "
echo "$corrN1 of $corrn1 unique operators"
echo
echo -n "n2 and N2 for $1: "
let totalN1=$resN1+$corrN1
let totaln1=$resn1+$corrn1
echo "$totaln1 : $totalN1"
echo
echo
# for verbosity just add a `v` as second argument
if [ "$2" == "v" ]; then
    echo "ack PATTERN:"
    echo "============"
    ack "$PATTERN" $1

    echo "ack IDENTIFIER:"
    echo "=============="
    ack "$IDENTIFIER" $1

    echo "ack TYPENAME:"
    echo "=============="
    ack "$TYPENAME" $1

    echo "ack CONSTANT:"
    echo "=============="
    ack "$CONSTANT" $1

    echo "ack EXCEPTIONS:"
    echo "================"
    ack "$EXCEPTIONS" $1
    echo
fi