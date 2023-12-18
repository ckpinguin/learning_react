#!/bin/bash

# Optimized for react/jsx!
SCSPEC='static'
TYPE_QUAL='const|let|private|protected|public'
RESERVED='(@[A-Z]\w+)| if |import |else|break|case|class |continue|default:|do |for |new\(|return|switch |while |this|try|catch|throw|throws|finally|instanceof |interface |extends |implements |abstract |true|false'

# Most arithmetic operators should have consequently whitespace before and after to be found consistently!
OPERATOR_ARITH="\s\+\s|\+\+|\s-\s|--|\s\*\s|\s/\s|%"
OPERATOR_ASSIGN="=||\+=|-=|\*=|/=|%="
OPERATOR_COMP="==+|\!=+| >|< |>=|<="
OPERATOR_TERN="\s\?\s.+:|^:|\s+\:"
OPERATOR_LOGIC="&&|\|\||\!"
OPERATOR_BITWISE="&|\|||~|^|\s<<\s|\s>>\s"
# We don't use the `in` operator
OPERATOR_DIV="\.\.\.|\(|;|\{|\[|=>|,|typeof |delete |instanceof |void "
OPERATORS="$OPERATOR_ARITH|$OPERATOR_ASSIGN|$OPERATOR_COMP|$OPERATOR_TERN|$OPERATOR_LOGIC|$OPERATOR_BITWISE|$OPERATOR_DIV"

# stuff, that falls down with above regex (a pro surely could do all of this better)
# we use perl-re with negative lookahead for this
# It's really very hard to get the . operator right. 20% too high is estimated,
# because . in './example.dotted' gets counted (1 time), because the point is
# not directly after '
CORRECTIONS="(?<!')(?<=\w)\.(?=\w)|(?<=\))\.|(?<=\s)\.(?!\.)|(?<!')(?<=\w):"
#CORRECTIONS="(?<!')(?:(\w+))\.(?=\w)(?!')|(?<=\))\.|(?<=\s)\.(?!\.)"
#CORRECTIONS="(?:(?<![\"'])\.|(?![\"']))|(?<=\))\.|(?<=\s)\.(?!\.)"
#CORRECTIONS="(?:(?<!['])\w+)\.(?!['])|(?<=\))\.|(?<=\s)\.(?!\.)|(?<!')(?<=\w):"
#CORRECTIONS="(?:(?<!['])(?:\w+))\.|(?<=\))\.|(?<=\s)\.(?!\.)"
#echo $CORRECTIONS
PATTERN="$SCSPEC|$TYPE_QUAL|$RESERVED|$OPERATORS"

COMMENTS='^ *//|^ */\*\*|^ *\*|^ *<\!--'
TAGS='<.+.*|[?:].+<.+>.*'
FUNCS='function |[a-z]+\(.*\) \{'
SPECIALS='^import '

EXCEPTIONS="$COMMENTS|$TAGS|$FUNCS|$SPECIALS"

IMPORT_SPECIAL='^import |,|;'

echo "File: $1"
echo "-----------------------------"

echo "with filtering:"
echo "==============="
grep -Pv "$EXCEPTIONS" $1 | egrep -o "$PATTERN" | sort -n | uniq -c
echo -n "Total operators (first run): "
resN1=`grep -Pv "$EXCEPTIONS" $1 | egrep -o "$PATTERN" | sort -n | uniq -c | awk '{print $1}' | paste -sd+ | bc`
resn1=`grep -Pv "$EXCEPTIONS" $1 | egrep -o "$PATTERN" | sort -n | uniq -c | wc -l`
echo "$resN1 of $resn1 unique operators"
echo
echo "2nd run / corrections: "
grep -Pv "$EXCEPTIONS" $1 | grep -Po "$CORRECTIONS" | sort -n | uniq -c
corrN1=`grep -Pv "$EXCEPTIONS" $1 | grep -Po "$CORRECTIONS" | sort -n | uniq -c | awk '{print $1}' | paste -sd+ | bc`
corrn1=`grep -Pv "$EXCEPTIONS" $1 | grep -Po "$CORRECTIONS" | sort -n | uniq -c | wc -l`
let corrN1=$corrN1+0
echo -n "Total corrections to count: "
echo "$corrN1 of $corrn1 unique operators"
# introducing an error factor of 10% to count the fact, that . operator
# is not counted correctly (. inside 'abc.xyz' are counted)
### let corrN1=$corrN1-$corrN1*10/100
### echo -n "Total corrections with corrected factor to count: "
### echo "$corrN1 of $corrn1 unique operators"
echo
echo "3rd run / count import and it's commas: "
egrep '^import' $1 | egrep -o "$IMPORT_SPECIAL" | sort -n | uniq -c
importCorrN1=`egrep '^import' $1 | egrep -o "$IMPORT_SPECIAL" | sort -n | uniq -c | awk '{print $1}' | paste -sd+ | bc`
#importCorrn1=`egrep '^import' $1 | egrep -o "$IMPORT_SPECIAL" | sort -n | uniq -c | wc -l`
# n1 for import is always 1 (`;` and `,` are counted above already)
importCorrn1=1
let importCorrN1=$importCorrN1+0
echo -n "Import stuff to count: "
echo "$importCorrN1 of $importCorrn1 import stuff"
echo
echo -n "n1 and N1 for $1: "
let totalN1=$resN1+$corrN1+$importCorrN1
let totaln1=$resn1+$corrn1+$importCorrn1
echo "$totaln1 : $totalN1"
echo
echo
# for verbosity just add a `v` as second argument
if [ "$2" == "v" ]; then
    # echo "ack corrections:"
    # echo "================"
    # ack "$PATTERN" $1
    # echo
    echo "no filtering:"
    echo "============="
    egrep -o "$PATTERN" $1 | sort -n | uniq -c
    echo -n "Total operators (unfiltered): "
    egrep -o "$PATTERN" $1 | sort -n | uniq -c | awk '{print $1}' | paste -sd+ | bc
    echo
    echo "exceptions filter:"
    echo "=================="
    egrep -o "$EXCEPTIONS" $1 | sort -n | uniq -c
    echo
    echo "grep COMMENTS:"
    echo "=============="
    egrep "$COMMENTS" $1
    echo
    echo "grep FUNCS:"
    echo "==========="
    egrep "$FUNCS" $1
    echo
    # echo "grep SPECIALS:"
    # echo "=============="
    # egrep "$SPECIALS" $1
    # echo
    echo "grep EXCEPTIONS:"
    echo "================"
    egrep "$EXCEPTIONS" $1
    echo
    echo "grep TERN (filtered):"
    echo "====================="
    grep -Pv "$EXCEPTIONS" $1 | grep -Po "$OPERATOR_TERN" | sort -n | uniq -c
fi