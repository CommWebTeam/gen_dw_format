# Convert WET 3 classes to WET 4 classes

This tool searches for WET 3 classes in an html document and converts them to their WET 4 equivalents.

This tool is mainly for one-to-one replacements, and will not cover every change that should be made from WET 3 to WET 4. The remaining changes should be implemented manually.

## List of default replacements made
<table>
    <tr>
        <th scope="col">WET 3 value</th>
        <th scope="col">WET 4 replacement</th>
    </tr>
    <tr>
        <td>align-left</td>
        <td>text-left</td>
    </tr>
    <tr>
        <td>align-right</td>
        <td>text-right</td>
    </tr>
    <tr>
        <td>background-accent </td>
        <td>bg-primary</td>
    </tr>
    <tr>
        <td>background-highlight </td>
        <td>bg-warning</td>
    </tr>
    <tr>
        <td>border-all</td>
        <td>brdr-tp brdr-lft brdr-bttm brdr-rght</td>
    </tr>
    <tr>
        <td>border-bottom</td>
        <td>brdr-bttm</td>
    </tr>
    <tr>
        <td>border-left</td>
        <td>brdr-lft</td>
    </tr>
    <tr>
        <td>border-right</td>
        <td>brdr-rght</td>
    </tr>
    <tr>
        <td>border-top</td>
        <td>brdr-tp</td>
    </tr>
    <tr>
        <td>button button-accent</td>
        <td>btn-primary</td>
    </tr>
    <tr>
        <td>button button-alert</td>
        <td>btn-danger</td>
    </tr>
    <tr>
        <td>button button-attention</td>
        <td>btn-warning</td>
    </tr>
    <tr>
        <td>button button-confirm</td>
        <td>btn-success</td>
    </tr>
    <tr>
        <td>button button-dark</td>
        <td>btn-info</td>
    </tr>
    <tr>
        <td>button-disabled</td>
        <td>disabled </td>
    </tr>
    <tr>
        <td>button-group</td>
        <td>btn-group</td>
    </tr>
    <tr>
        <td>button button-info</td>
        <td>btn-primary</td>
    </tr>
    <tr>
        <td>button-large</td>
        <td>btn-lg</td>
    </tr>
    <tr>
        <td>button-none</td>
        <td>btn-link</td>
    </tr>
    <tr>
        <td>button-small</td>
        <td>btn-sm</td>
    </tr>
    <tr>
        <td>button-toolbar</td>
        <td>btn-toolbar</td>
    </tr>
    <tr>
        <td>button-xlarge</td>
        <td>btn-lg</td>
    </tr>
    <tr>
        <td>button</td>
        <td>btn btn-default</td>
    </tr>
    <tr>
        <td>menu-horizontal</td>
        <td>list-inline</td>
    </tr>
    <tr>
        <td>clearLeft</td>
        <td>clearfix</td>
    </tr>
    <tr>
        <td>clear-left</td>
        <td>clearfix</td>
    </tr>
    <tr>
        <td>clearRight</td>
        <td>clearfix</td>
    </tr>
    <tr>
        <td>clear-right</td>
        <td>clearfix</td>
    </tr>
    <tr>
        <td>clearboth</td>
        <td>clearfix</td>
    </tr>
    <tr>
        <td>clear</td>
        <td>clearfix</td>
    </tr>
    <tr>
        <td>color-accent</td>
        <td>text-primary</td>
    </tr>
    <tr>
        <td>color-attention</td>
        <td>text-danger</td>
    </tr>
    <tr>
        <td>color-medium</td>
        <td>text-muted</td>
    </tr>
    <tr>
        <td>display-block</td>
        <td>show</td>
    </tr>
    <tr>
        <td>equalize</td>
        <td>wb-eqht</td>
    </tr>
    <tr>
        <td>float-left</td>
        <td>pull-left</td>
    </tr>
    <tr>
        <td>float-right</td>
        <td>pull-right</td>
    </tr>
    <tr>
        <td>font-small </td>
        <td>small</td>
    </tr>
    <tr>
        <td>font-xlarge</td>
        <td>lead</td>
    </tr>
    <tr>
        <td>footnote-link</td>
        <td>fn-lnk</td>
    </tr>
    <tr>
        <td>footnote-return</td>
        <td>fn-rtn</td>
    </tr>
    <tr>
        <td>form-alert</td>
        <td>has-error</td>
    </tr>
    <tr>
        <td>form-attention</td>
        <td>has-warning</td>
    </tr>
    <tr>
        <td>form-checkbox form-label-inline</td>
        <td>checkbox-inline</td>
    </tr>
    <tr>
        <td>form-confirm</td>
        <td>has-success</td>
    </tr>
    <tr>
        <td>form-alert</td>
        <td>has-error</td>
    </tr>
    <tr>
        <td>form-attention</td>
        <td>has-warning</td>
    </tr>
    <tr>
        <td>form-confirm</td>
        <td>has-success</td>
    </tr>
    <tr>
        <td>form-label-inline</td>
        <td>form-inline</td>
    </tr>
    <tr>
        <td>form-text-inline</td>
        <td>form-inline</td>
    </tr>
    <tr>
        <td>indent-large</td>
        <td>mrgn-lft-lg</td>
    </tr>
    <tr>
        <td>indent-medium</td>
        <td>mrgn-lft-md</td>
    </tr>
    <tr>
        <td>indent-none</td>
        <td>mrgn-lft-0</td>
    </tr>
    <tr>
        <td>indent-small</td>
        <td>mrgn-lft-sm</td>
    </tr>
    <tr>
        <td>indent-xlarge</td>
        <td>mrgn-lft-xl</td>
    </tr>
    <tr>
        <td>list-bullet-none</td>
        <td>list-unstyled</td>
    </tr>
    <tr>
        <td>list-lower-alpha</td>
        <td>lst-lwr-alph</td>
    </tr>
    <tr>
        <td>list-lower-roman</td>
        <td>lst-lwr-rmn</td>
    </tr>
    <tr>
        <td>list-numeric</td>
        <td>lst-num</td>
    </tr>
    <tr>
        <td>list-upper-alpha</td>
        <td>lst-upr-alph</td>
    </tr>
    <tr>
        <td>list-upper-roman</td>
        <td>lst-upr-rmn</td>
    </tr>
    <tr>
        <td>margin-bottom-large</td>
        <td>mrgn-bttm-lg</td>
    </tr>
    <tr>
        <td>margin-bottom-medium</td>
        <td>mrgn-bttm-md</td>
    </tr>
    <tr>
        <td>margin-bottom-none</td>
        <td>mrgn-bttm-0</td>
    </tr>
    <tr>
        <td>margin-bottom-small</td>
        <td>mrgn-bttm-sm</td>
    </tr>
    <tr>
        <td>margin-bottom-xlarge</td>
        <td>mrgn-bttm-xl</td>
    </tr>
    <tr>
        <td>margin-left-large</td>
        <td>mrgn-lft-lg</td>
    </tr>
    <tr>
        <td>margin-left-medium</td>
        <td>mrgn-lft-md</td>
    </tr>
    <tr>
        <td>margin-left-none</td>
        <td>mrgn-lft-0</td>
    </tr>
    <tr>
        <td>margin-left-small</td>
        <td>mrgn-lft-sm</td>
    </tr>
    <tr>
        <td>margin-left-xlarge</td>
        <td>mrgn-lft-xl</td>
    </tr>
    <tr>
        <td>margin-right-large</td>
        <td>mrgn-rght-lg</td>
    </tr>
    <tr>
        <td>margin-right-medium</td>
        <td>mrgn-rght-md</td>
    </tr>
    <tr>
        <td>margin-right-none</td>
        <td>mrgn-rght-0</td>
    </tr>
    <tr>
        <td>margin-right-small</td>
        <td>mrgn-rght-sm</td>
    </tr>
    <tr>
        <td>margin-right-xlarge</td>
        <td>mrgn-rght-xl</td>
    </tr>
    <tr>
        <td>margin-top-large</td>
        <td>mrgn-tp-lg</td>
    </tr>
    <tr>
        <td>margin-top-medium</td>
        <td>mrgn-tp-md</td>
    </tr>
    <tr>
        <td>margin-top-none</td>
        <td>mrgn-tp-0</td>
    </tr>
    <tr>
        <td>margin-top-small</td>
        <td>mrgn-tp-sm</td>
    </tr>
    <tr>
        <td>margin-top-xlarge</td>
        <td>mrgn-tp-xl</td>
    </tr>
    <tr>
        <td>opacity-10</td>
        <td>opct-10</td>
    </tr>
    <tr>
        <td>opacity-100</td>
        <td>opct-100</td>
    </tr>
    <tr>
        <td>opacity-20</td>
        <td>opct-20</td>
    </tr>
    <tr>
        <td>opacity-30</td>
        <td>opct-30</td>
    </tr>
    <tr>
        <td>opacity-40</td>
        <td>opct-40</td>
    </tr>
    <tr>
        <td>opacity-50</td>
        <td>opct-50</td>
    </tr>
    <tr>
        <td>opacity-60</td>
        <td>opct-60</td>
    </tr>
    <tr>
        <td>opacity-70</td>
        <td>opct-70</td>
    </tr>
    <tr>
        <td>opacity-80</td>
        <td>opct-80</td>
    </tr>
    <tr>
        <td>opacity-90</td>
        <td>opct-90</td>
    </tr>
    <tr>
        <td>print-none</td>
        <td>hidden-print</td>
    </tr>
    <tr>
        <td>uppercase</td>
        <td>text-uppercase</td>
    </tr>
    <tr>
        <td>wet-boew-footnotes</td>
        <td>wb-fnote</td>
    </tr>
    <tr>
        <td>wb-invisible</td>
        <td>wb-inv</td>
    </tr>
    <tr>
        <td>wrap-none</td>
        <td>nowrap</td>
    </tr>
</table>

## Optional replacements

The user can select whether to apply the following replacements.

### align-center

The "align-center" class is replaced with "center-block" for the following tags:
- div
- img

Otherwise, it is replaced with "text-center".

For example,
- <span style="color:red">&lt;div class="align-center"></span> becomes <span style="color:green">&lt;div class="center-block"></span>.
- <span style="color:red">&lt;p class="align-center"></span> becomes <span style="color:green">&lt;p class="text-center"></span>.

### span#

The "span-#" classes are replaced with their "col-md-#" equivalents as follows:

<table>
    <tr>
        <th scope="col">WET 3 value</th>
        <th scope="col">WET 4 replacement</th>
    </tr>
    <tr>
        <td>span-1</td>
        <td>col-md-2</td>
    </tr>
    <tr>
        <td>span-2</td>
        <td>col-md-4</td>
    </tr>
    <tr>
        <td>span-3</td>
        <td>col-md-6</td>
    </tr>
    <tr>
        <td>span-4</td>
        <td>col-md-8</td>
    </tr>
    <tr>
        <td>span-5</td>
        <td>col-md-10</td>
    </tr>
    <tr>
        <td>span-6</td>
        <td>col-md-12</td>
    </tr>
</table>
