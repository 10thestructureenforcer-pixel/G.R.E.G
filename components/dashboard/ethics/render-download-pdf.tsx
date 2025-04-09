import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import parse from "html-react-parser";

// Create styles
const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 50,
    marginBottom: 10,
  },
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 5,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
  },
  strong: {
    fontWeight: "bold",
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 2,
  },
  olistItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  ulistItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  listItemNumber: {
    marginRight: 5,
  },
  listItemBullet: {
    marginRight: 5,
  },
  listItemContent: {
    flex: 1,
  },
  ol: {
    marginLeft: 20,
  },
  ul: {
    marginLeft: 20,
  },
  hr: {
    marginVertical: 10,
    borderBottom: "1px solid black",
  },
  memorandumHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
  },
  memoInfo: {
    marginBottom: 15,
  },
  infoLine: {
    flexDirection: "row",
    marginBottom: 3,
  },
  infoLabel: {
    fontWeight: "bold",
    width: 60,
  },
  infoValue: {
    flex: 1,
  },
});

// Function to convert HTML React elements to PDF components
const convertToPDFComponent: any = (element: any) => {
  if (typeof element === "string") {
    return <Text>{element}</Text>;
  }

  if (!element || !element.type) return null;

  // Handle different HTML elements
  switch (element.type) {
    case "p":
      return (
        <View style={styles.paragraph}>
          <Text>{processChildren(element.props.children)}</Text>
        </View>
      );

    case "strong":
      return (
        <Text style={styles.strong}>
          {processChildren(element.props.children)}
        </Text>
      );

    case "br":
      return <Text>{"\n"}</Text>;

    case "h1":
      return (
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {processChildren(element.props.children)}
          </Text>
        </View>
      );

    case "h2":
      return (
        <View style={{ marginBottom: 12, marginTop: 10, marginLeft: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {processChildren(element.props.children)}
          </Text>
        </View>
      );

    case "h3":
      return (
        <View style={{ marginBottom: 10, marginLeft: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {processChildren(element.props.children)}
          </Text>
        </View>
      );

    case "ul":
      return (
        <View style={styles.ul}>
          {Array.isArray(element.props.children)
            ? element.props.children.map((child: any, index: number) => (
                <View key={index} style={styles.ulistItem}>
                  <Text style={styles.listItemBullet}>•</Text>
                  <View style={styles.listItemContent}>
                    <Text>{processChildren(child.props.children)}</Text>
                  </View>
                </View>
              ))
            : null}
        </View>
      );

    case "ol":
      return (
        <View style={styles.ol}>
          {Array.isArray(element.props.children)
            ? element.props.children.map((child: any, index: number) => (
                <View key={index} style={styles.olistItem}>
                  <Text style={styles.listItemNumber}>{index + 1}.</Text>
                  <View style={styles.listItemContent}>
                    <Text>{processChildren(child.props.children)}</Text>
                  </View>
                </View>
              ))
            : null}
        </View>
      );

    case "li":
      return (
        <View style={styles.listItem}>
          <Text>{processChildren(element.props.children)}</Text>
        </View>
      );

    default:
      // For other HTML elements or custom components
      if (element.props && element.props.children) {
        return processChildren(element.props.children);
      }
      return null;
  }
};

// Process children elements recursively
const processChildren = (children: any) => {
  if (!children) return null;

  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    const processedChildren = children.map((child, index) => {
      if (typeof child === "string") {
        return child;
      } else if (child && child.type === "strong") {
        return (
          <Text key={index} style={styles.strong}>
            {processChildren(child.props.children)}
          </Text>
        );
      } else if (child && typeof child === "object") {
        return convertToPDFComponent(child);
      }
      return null;
    });

    return <React.Fragment>{processedChildren}</React.Fragment>;
  }

  // If children is an object (React element)
  if (children && typeof children === "object") {
    return convertToPDFComponent(children);
  }

  return children;
};

// Create document
const DownLoadPDF = ({ generatedMemo }: { generatedMemo: string }) => {
  console.log("the tax plan is", generatedMemo);

  // Parse the HTML content
  const elements = parse(generatedMemo);

  // Function to render HTML elements
  const renderHTMLElements = () => {
    // Handle array of elements
    if (Array.isArray(elements)) {
      return elements.map((element, index) => (
        <View key={index}>{convertToPDFComponent(element)}</View>
      ));
    }

    // Handle single element
    return convertToPDFComponent(elements);
  };

  return (
    <Document>
      <Page style={styles.page}>
        <Image src="/logos/greg_1.png" style={styles.logo} />
        {/* Render parsed HTML content */}
        {renderHTMLElements()}
      </Page>
    </Document>
  );
};

export default DownLoadPDF;
