# AP-Research
This project was developed as part of my AP Research study, which examines trust calibration in human-AI decision-making processes. My study specifically focuses on high-risk scenarios, aiming to identify techniques that optimize trust in AI systems while enhancing decision-making performance among teens. Researchers from the Georgia Institute of Technology found that trust in AI is correlated with decision-making accuracy and performance in decision-making processes [(Silva et al., 2022)](https://doi.org/10.1080/10447318.2022.2101698). This underscores the critical role of trust in human-AI collaboration, making trust calibration the core focus of my study.  

While significant research has been conducted on human-AI interactions, there is a notable gap in understanding how teens interact with AI systems. Teens’ decision-making processes differ significantly from adults, often being more influenced by social and emotional factors, making this demographic unique and understudied. To address this gap, my study evaluates three primary factors: **AI explainability**, **peer influence**, and **personality-tailored feedback**, investigating their impact on trust and performance in a controlled experimental setting.


## Research Question
**What are the best techniques that can be implemented in the field of human-AI interactions to appropriately adjust human trust and improve decision-making abilities and performance for teens in high-risk scenarios?**

## About the Project
This project features a web-based platform built with **React** and **Node.js** to simulate a high-risk decision-making scenario and collect participant responses. The primary task is a mushroom-picking simulation, adapted from the methodologies described by [Leichtmann et al. (2023)](https://doi.org/10.1016/j.chb.2022.107539). A Convolutional Neural Network was built to classify mushroom images as poisonous or edible based on various Kaggle datasets.

Participants are randomly assigned to one of eight experimental groups based on combinations of the three study factors. The platform dynamically customizes the simulation experience for each participant by:
- Presenting **AI recommendations** with or without explanations. Explanations were presented visually, utilizing a SmoothGrad saliency map, a technique that highlights regions of input images most relevant to the AI's decision.
- Showing **peer influence cues** based on group conditions.
- Providing **personality-specific feedback** using pre-task survey results from the **Big Five Personality Traits Model**.

Post-task surveys further evaluate participants' trust and understanding of the AI system.

### Key Features:
- **Dynamic Experiment Design**: Randomized group assignments for eight experimental conditions.
- **Firebase Firestore Integration**: Secure storage of all participant data, including survey responses and simulation results.
- **Hosting**: Initially deployed on **Firebase Hosting**, later transitioned to **Vercel** to overcome access restrictions on **Dallas ISD servers**.

The platform is optimized for accessibility and scalability, enabling seamless participant engagement and efficient data collection.
